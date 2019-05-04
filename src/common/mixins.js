
export const modalControl = {
	methods:{
		showModal(msg){
			this.$refs.modal.show(msg)
		},
		closeModal(){
			this.$refs.modal.hide()
		}
	}
}