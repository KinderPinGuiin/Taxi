"use strict"

// On ajoute le WYSIWYG et on focus dedans
window.addEventListener("load", () => {
    const wysiwygHome = new WYSIWYG(
        ".WYSIWYG_accueil", CLASS_FOLDER + "WYSIWYG/", 
        [], document.querySelector(".homeContent").innerHTML
    )
    const wysiwygAbout = new WYSIWYG(
        ".WYSIWYG_about", CLASS_FOLDER + "WYSIWYG/",
        [], document.querySelector(".aboutContent").innerHTML
    )

    // On gère la soumission du formulaire pour remplir les input hidden
    document.querySelectorAll(".edit_form").forEach(form => {
        form.addEventListener("submit", e => {
            e.preventDefault()
            e.originalTarget.querySelector(".editedContent").value =
                e.originalTarget.querySelector(".WYSIWYG .editor").innerHTML
            e.target.submit()
        })
    })

    function uploadImage() {
        // On gère l'upload d'image
        document.querySelector(".upload_image form").addEventListener("submit", e => {
            e.preventDefault()
            let data = new FormData(document.querySelector(".upload_image form"))
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: "/image/upload",
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                success: (data) => {
                    console.log(data)
                },
                error: (e) => {
                    console.log(e)
                }
            });
        })
    }

    function listImage() {
        // Listing des images
        document.querySelector(".img_display_button").addEventListener("click", () => {
            let container = document.querySelector(".images_container")
            container.querySelector(".images").innerHTML = ""
            container.querySelector(".loader").style.display = "block"
            $.ajax({
                type: "POST",
                url: "/images",
                success: (data) => {
                    container.querySelector(".loader").style.display = "none"
                    let imageElement, i
                    for (i in data) {
                        imageElement = document.createElement("img")
                        imageElement.setAttribute("src", data[i].url)
                        imageElement.setAttribute("alt", data[i].alt)
                        imageElement.setAttribute("width", "100px")
                        container.querySelector(".images").appendChild(imageElement)
                    }
                },
                error: (e) => {
                    console.log(e)
                }
            });
        })
    }

    listImage()
})
