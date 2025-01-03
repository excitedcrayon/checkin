console.log("check in");

window.addEventListener('DOMContentLoaded', () => {
    registerUser();
});

const registerUser = () => {
    const firstname = document.querySelector("[name='firstname']");
    const middlename = document.querySelector("[name='middlename']");
    const lastname = document.querySelector("[name='lastname']");
    const region = document.querySelector("[name='region']");
    const phone = document.querySelector("[name='phone']");
    const passportnumber = document.querySelector("[name='passportnumber']");
    const placeofstay = document.querySelector("[name='placeofstay']");
    const generatedImage = document.querySelector("[name='generatedimage']");
    const registerButton = document.querySelector("[name='register']");

    registerButton.addEventListener('click', (e) => {
        e.preventDefault();

        const usernameData = ( middlename.value.length > 0 ) ? `${firstname.value} ${middlename.value} ${lastname.value}` : `${firstname.value} ${lastname.value}`;

        generateUserQRCode(usernameData, generatedImage);

        console.log('Registering and Generation QR Code');

        setTimeout(() => {
            console.log(generatedImage.files);
            // send data to database here
        }, 1000);


    });

};

const generateUserQRCode = async ( username, generatedImageElement ) => {
    const qrCodeImage = document.querySelector('.qr-code-image');
    qrCodeImage.innerHTML = "";

    await new QRCode(qrCodeImage, {
        text: username,
        width: 200,
        height: 200
    });

    const formattedName = `${Date.now()}-${username.replace(/ /g, "-")}`;

    qrCodeImage.childNodes[0].toBlob( (blob) => {
        const file = new File( [blob], `${formattedName}.png` );
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        generatedImageElement.files = dataTransfer.files;
    });

};