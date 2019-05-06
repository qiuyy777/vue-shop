export const modalControl = {
    methods: {
        showModal(msg) {
            this.$refs.modal.show(msg)
        },
        closeModal() {
            this.$refs.modal.hide()
        }
    }
}

export const forSearch = {
    methods: {
        jumpToSearch() {
            //解决跳转时的手机键盘呼出
            this.$refs.searchBox.blur()
            this.$router.push('/search')
        }
    }
}