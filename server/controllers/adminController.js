import Menu from "../models/Menu.js";
import Notice from "../models/Notice.js";

export const addMenu = async (req, res) => {
  const menu = await Menu.create(req.body);
  res.json(menu);
};

export const addNotice = async (req, res) => {
  const notice = await Notice.create({ content: req.body.content });
  res.json(notice);
};
