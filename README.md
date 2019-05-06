## 项目简介

### 技术栈
* vue全家桶
* webpack
* node(express)
* mongodb
* 项目上线部署

使用以下用户名和密码可登陆体验，也可以自行注册账号。
用户名和密码:admin123

### 页面构成
####  1.主页
1. 滚动广告栏,使用了swiper插件。
2. 分类，仿饿了么，可以左右切换到下一页。
3. 推荐商品懒加载，分页查询
4. 推荐栏可吸顶。
5. 回到顶部按钮。
6. 添加到购物车，弹窗提醒登录。

#### 2.搜索页
1. 输入搜索词显示搜索结果列表，点击可查询商品详细信息，并添加到历史搜索。
2. 点击回车，查询商品详情，并保存到搜索历史。
3. 清空搜索历史。
4. 清空搜索框。

#### 3.分类页
1. 左侧为一级类目，右侧为二级类目。
2. 点击一级类目，显示选中的背景，并显示相应的二级类目。

#### 4.购物车
1. 选中单个，多个或全部商品去结算。
2. 选中单个，多个或全部商品去结算删除。
3. 通过加减按钮修改商品数量。
4. 直接输入数字修改商品数量。
5. 实时计算商品总额。
6. 退出购物页,清空选中项。


#### 5.结算页
1. 显示购物车选中的商品。
2. 将默认选中的地址设为订单收货地址。
3. 点击结算，创建订单，并保存到数据库中。

#### 6.订单页
1. 显示订单列表。

#### 7.用户中心
1. 跳转到登录。
2. 直接退出。
2. 查看收货地址。


#### 8.地址页
1. 显示收货地址。
2. 将默认的地址放在首位显示。
3. 添加收货地址。
4. 删除收货地址。

#### 9.登录页
1. 校验用户与密码。
2. 实现登录。
3. 跳转到注册页。

#### 10.注册页
1. 检测用户名格式，以及用户名有效性。
2. 检测邮箱格式，以及邮箱有效性。
3. 检验密码格式。
4. 检验两次输入的密码一致性。

# 后记

**关于代码缩进**
自己使用的一个破解版本的sublime,缩进都是4个空格。
想改成2个空格缩进，一直不成功，上网搜索很多很多方法，就是不成功。
保存后再打开又变回原先的4个空格。索性就放弃了......

package control被墙,现在已经抛弃sublime了。

**感谢**
项目中很多莫名其妙的坑，基本靠百度。
因此真的是非常感谢那些将填坑经历写成一篇篇博文，供别人借鉴的程序员。



