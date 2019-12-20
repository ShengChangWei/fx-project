/**
 * 请求接口提醒
 * @param {Object} res
 * @param {Function} success
 * @param {Function} error
 */
export function messageUtils(res, success = new Function(), error = new Function()) {
    if (res.code === 'ok') {
        success();
        this.$message({
            message: res.info,
            type: 'success'
        });
    } else {
        error();
        this.$message({
            message: res.info,
            type: 'error'
        });
    }
}
