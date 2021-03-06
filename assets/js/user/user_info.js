$(function () {

    const form = layui.form;
    // 自定义校验规则
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
        },
    });


    const layer = layui.layer;
    // 初始化用户信息
    const initUserInfo = () => {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: (res) => {
                if (res.status !== 0) return layer.msg("获取用户信息失败！");
                console.log(res);
                //   layer.msg("获取用户信息成功！");
                form.val("formUserInfo", res.data);
            },
        });
    };
    initUserInfo()
    // var layer =layui.layer;
    // const  initUserInfo =()=>{
    // $.ajax({
    //     type:"get ",
    //     url:"my/userinfo",
    //     success:(res)=>{
    // if(res.ststus !==0)return layer.msg('获取用户信息失败')
    // console.log(res);
    // layer.msg('获取用户信息成功')

    //     }


    // })
    // }
    //!重置按钮重置后保留获取的用户信息
    $("#btnreset").click(function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //!更新用户修改的信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取用户信息失败!!')
                layer.msg('获取用户信息成功!!')

            }
        })
    })


})