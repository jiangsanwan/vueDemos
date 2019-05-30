# 创建数据库、切换数据表
# use fremember;

# 删除数据表
# db.dropDatabase();

# 创建集合
# db.createCollection(name, options)
# options对象属性：
# 	capped 布尔（可选）如果为 true，则创建固定集合。固定集合是指有着固定大小的集合，
# 		   当达到最大值时，它会自动覆盖最早的文档。当该值为 true 时，必须指定 size 参数。
#	autoIndexId	布尔	（可选）如为 true，自动在 _id 字段创建索引。默认为 false。
#	size 数值（可选）为固定集合指定一个最大值（以字节计）。如果 capped 为 true，也需要指定该字段。
#	max	数值（可选）指定固定集合中包含文档的最大数量。

# 删除集合
# db.集合名称.drop();

# 创建招聘项目--用户集合
# 创建固定集合 zp_user，整个集合空间大小 6142800 KB, 文档最大个数为 100000 个。
# db.createCollection("zp_user", { capped : true, autoIndexId : true, size : 6142800, max : 100000 } );