function serializeToJson(form) {
    var result = {};
    // serializeArray()获取到表单中用户输入的内容
    // 返回值是一个数组,数组中会存储多个对象,具体多少个对象取决于有多少表单控件
    // [{name: '控件name属性的值', value: '用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value;
    });
    return result;
}