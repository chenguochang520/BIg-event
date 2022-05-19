$(function () {

    //! 点击去注册账号让 登录框隐藏，注册框显示
    $("#link_reg").click(() => {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 点击去登录让 注册框隐藏，登录框显示
    $("#link_login").click(() => {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    //! 注册验证表单
    const form = layui.form
    form.verify({
        // 自定义一个叫 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

        //todo 确认两次密码相同
        repwd: (val) => {

            const pwd = $(".reg-box [name=password]").val();
            //   alert(pwd)
            if (pwd !== val) return "两次密码不一致"
        }
    })
    //!发送注册请求
    const layer = layui.layer
    $("#form_reg").on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $("#form_reg [name=username").val(),
                password: $("#form_reg [name=password").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg("注册失败");
                layer.msg("注册成功！");
                // 注册成功后跳转到登录界面
                $("#link_login").click();
            },

        })
    });
    //!登录请求
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            // data: $("#form_login").serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg("登录失败");
                layer.msg("登录成功！");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token", res.token);
                // 跳转到主页-
                location.href = "/index.html";
            }

        })
    })


})