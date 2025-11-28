import Menu from "../models/menu.model.js";
import { redis } from "../Utils/redis.js";
import cloudinary, { uploadImage } from "../Utils/cloudniray.js";
import kitchen from "../models/kitchen.model.js";

export const getKitchenMenu = async (req, res) => {
  try {
    const { kitchenId } = req.params;
    if (!kitchenId) {
      return res
        .status(400)
        .json({ success: false, message: "kitchenId is required" });
    }

    const kitchenMenu = await kitchen.findById(kitchenId).populate("menuItems");
    if (!kitchenMenu || kitchenMenu.menuItems.length === 0) {
      return res.status(404).json({ success: false, message: "No Menu found" });
    }
    return res
      .status(200)
      .json({ success: true, Menus: kitchenMenu.menuItems });
  } catch (error) {
    console.error("error in getMenu controller", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getFeaturedMenu = async (req, res) => {
  try {
    //first check in redis cache
    let featuredMenu = await redis.get("featuredMenu");

    if (featuredMenu) {
      return res.status(200).json({
        success: true,
        featuredMenu: JSON.parse(featuredMenu),
      });
    }
    featuredMenu = await Menu.find({ isFeatured: true }).lean();
    if (featuredMenu.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No featured Menu found" });
    }
    //store in redis cache for future requests
    await redis.set("featuredMenu", JSON.stringify(featuredMenu));

    return res.status(200).json({ success: true, featuredMenu });
  } catch (error) {
    console.error("error in getFeaturedMenu controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const addMenu = async (req, res) => {
  const kitchenId = req.params.kitchenId;
  const { name, price, description, category, quantity, available } = req.body;
  try {
    const kitchenExists = await kitchen.findById(kitchenId);
    if (!kitchenExists) {
      return res
        .status(404)
        .json({ success: false, message: "kitchen not found" });
    }

    const cloudinaryResponse = await uploadImage(req.file.path, "Menu");
    const menu = new Menu({
      kitchen: kitchenId,
      name,
      price,
      description,
      category,
      quantity,
      imageURL: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : " ",
      available,
    });
    await menu.save();
    kitchenExists.menuItems.push(menu._id);
    await kitchenExists.save();
    return res
      .status(201)
      .json({ success: true, menu, kitchen: kitchenExists });
  } catch (error) {
    console.error("error in addMenu controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, available, category } =
      req.body;
      let cloudinaryResponse =null;

    const menu = await Menu.findById(id);
    if (!menu) {
      return res
        .status(404)
        .json({ success: false, message: "menu not found" });
    }

    //if image is updated delete old image from cloudinary
    if(req.file){
      try {
        const menuImageId = menu.imageURL.split("/").pop().split(".")[0];
        console.log("menuImageId", menuImageId);
        await cloudinary.uploader.destroy(menuImageId);
      } catch (error) {
        console.error("error in deleting old menu image from cloudinary", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
      //upload updated image
       cloudinaryResponse = await uploadImage(req.file.path, "Menu");
    }


    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        available,
        imageURL: cloudinaryResponse?.secure_url
          ? cloudinaryResponse.secure_url
          : menu.imageURL,
        category,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "menu update successfully", updatedMenu });
  } catch (error) {
    console.error("error in update menu controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const kitchenId = req.params.kitchenId;
    const { id } = req.params;

    const menu = await Menu.findById(id);

    if (!menu) {
      return res
        .status(404)
        .json({ message: false, message: "menu not found" });
    }
    if (menu.imageURL) {
      try {
        const menuImageId = menu.imageURL.split("/").pop().split(".")[0];
        console.log("menuImageId", menuImageId);
        await cloudinary.uploader.destroy(menuImageId);
      } catch (error) {
        console.error("error in deleting menu image from cloudinary", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        });
      }
    }

    await Menu.findByIdAndDelete(id);

    await kitchen.findByIdAndUpdate(
      kitchenId,
      { $pull: { menuItems: id } },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "menu delete successfully" });
  } catch (error) {
    console.error("error in delete menu controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const getCategoryMenu = async (req, res) => {
  try {
    const { category,kitchenId } = req.params;

    const categoryMenu = await Menu.find({ category, kitchen: kitchenId }).populate("kitchen", "kitchenName kitchenAddress kitchen");
    if (categoryMenu.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Menu found of this category",
      });
    }
    return res.status(200).json({ success: true, categoryMenu });
  } catch (error) {
    console.error("error in getCategoryMenu controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


//todo: get recommended products based on random selection

export const getRecommendedMenu = async (req, res) => {
  try {
    const Menu = await Menu.aggregate([
      { $sample: { size: 3 } },
      { $project: { _id: 1, name: 1, price: 1, imageURL: 1, category: 1 } },
    ]);
    if (Menu.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No recommended Menu found" });
    }
    return res.status(200).json({ success: true, Menu });
  } catch (error) {
    console.error("error in getRecommendedMenu controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const toggleFeaturedMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const featuredMenu = await Menu.findById(id);
    if (featuredMenu) {
      featuredMenu.isFeatured = !featuredMenu.isFeatured;
      await featuredMenu.save();
      await toggleFeaturedroductInRedis();
    }
  } catch (error) {
    console.error("error in toggleFeaturedroduct controller", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const toggleFeaturedroductInRedis = async () => {
  try {
    const featuredMenu = await Menu.find({ isFeatured: true }).lean();
    await redis.set("featuredMenu", JSON.stringify(featuredMenu));
  } catch (error) {
    console.log("error in save toggleFeaturedroductInRedis", error);
  }
};
