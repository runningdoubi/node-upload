function formSubmit() {
    let file = $('#file').val();
    if (file) {
        $('#form').ajaxSubmit((msg) => {
            console.log(msg);
            window.alert(JSON.stringify(msg));
            window.location.reload();
        })
    } else {
        window.alert('请选文件');
    }
    return false;
}