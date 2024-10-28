const openModal = document.querySelector("[data-open-modal]")
const closeModal = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")

openModal.addEventListener("click", () => {
    modal.showModal()
})

closeModal.addEventListener("click", () => {
    modal.close()
})