$(function () {
    load()
    $("#title").on("keydown", function (event) {
        if (event.keyCode == 13) {
            // 先读取本地存储原来的数据
            var local = getDate()
            // 把local数组进行数据更新，把最新的数据追加给local数组
            local.push({ title: $(this).val(), done: false })
            // 重新存到本地存储
            saveDate(local);
            load()
            $(this).val("")
        }
    })
    // 1.读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return [];
        }
    }
    // 2.存取数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }
    // 3.tudolist删除操作
    $("ol").on("click", "a", function () {
        // 先获取本地存储
        var data = getDate()
        // 修改数据
        var index = $(this).attr("id");
        data.splice(index, 1)
        // 保存到本地存储 
        saveDate(data)
        // 重新渲染页面
        load()
    })
    // 4.toDoList正在进行和已经完成选项操作
    $("ol,ul").on("click", "input", function () {
        // 先获取本地存储的数据
        var data = getDate()
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked")
        // 保存到本地存储
        saveDate(data)
        // 重新渲染页面
        load()
    })
    // 5.获取本地存储的数据渲染
    function load() {
        // 遍历前要先清空元素里面的内容
        $("ol,ul").empty()
        var todoCount = 0 //正在进行的个数
        var doneCount = 0 //已经完成的个数
        var data = getDate()
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type = 'checkbox' checked='checked' ><span>" + n.title + "</span><a id = " + i + ">删除</a></li>")
                doneCount++;
            } else {
                $("ol").prepend("<li><input type = 'checkbox'><span>" + n.title + "</span><a id = " + i + ">删除</a></li>")
                todoCount++;
            }
        });
        $("#todocount").text(todoCount)
        $("#donecount").text(doneCount)
    }
})