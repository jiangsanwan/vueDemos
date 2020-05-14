let express = require('express')
let Router = express.Router()
let model = require('./../../model/index')

let Position = model.getModel('position')
let Company = model.getModel('company')
let status = require('./../../comment')


const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/"

/**
 * 1、根据招聘者publicId获取公司信息
 * 2、根据传入的只为的id获取职位详情
 */
function* getDoubleDetail (_id) {
    let res1 = yield getDetail(_id)
    yield getDetail(res1)
}
function getDetail (_id) {
    return new Promise(resolve => {
        Position.findOne({ _id: _id }, (err, doc) => {
            if(err) {
                return res.json(status.code_8)
            } else {
                resolve(doc)
            }
        })
    })
}
Router.get('/detail', (req, res) => {
    let _id = req.query.publicId,
        _getDetail = getDoubleDetail(_id);
    _getDetail.next().value.then((doc) => {
        MongoClient.connect(url, { useUnifiedTopology: true }, function(_err, db) {
            if (_err) {
                return res.json(status.code_14)
            } else {
                let dbo = db.db("fremember"),
                    whereStr = { publicId: { $regex: doc.publicId } }; // 查询条件
                dbo.collection("companys").findOne(whereStr, function(_e, _r) {
                    if (_e) {
                        return res.json(status.code_18)
                    } else {
                        delete doc._doc._id
                        let result = { ..._r, ...doc._doc }
                        return res.json({ code: 0, message: '公司信息获取成功', data: result })
                    }
                })
            }
        })
    })
})

module.exports = Router