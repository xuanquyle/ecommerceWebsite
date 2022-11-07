const { application } = require("express");

const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const color_opt = new Schema({
    code: { type: String },
    name: { type: String }
})
const rom_opt = new Schema({
    code: { type: String },
    name: { type: String }
})
const ram_opt = new Schema({
    code: { type: String },
    name: { type: String }
})

const exp_color = mongoose.model('color_opts', color_opt);
const exp_rom = mongoose.model('rom_opts', rom_opt);
const exp_ram = mongoose.model('ram_opts', ram_opt);

module.exports = {
    exp_color,exp_rom,exp_ram
}