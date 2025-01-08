console.log("check in initialized");

window.addEventListener('DOMContentLoaded', () => {
    registerUser();
    getRegisteredList();
});

const registerUser = () => {
    const firstname = document.querySelector("[name='firstname']");
    const middlename = document.querySelector("[name='middlename']");
    const lastname = document.querySelector("[name='lastname']");
    const gender = document.querySelector("[name='gender']");
    const region = document.querySelector("[name='region']");
    const fellowshipgroup = document.querySelector("[name='fellowshipgroup']");
    const category = document.querySelector("[name='category']");
    const department = document.querySelector("[name='department']");
    const email = document.querySelector("[name='email']");
    const phone = document.querySelector("[name='phone']");
    const passportnumber = document.querySelector("[name='passportnumber']");
    const placeofstay = document.querySelector("[name='placeofstay']");
    const generatedImage = document.querySelector("[name='generatedimage']");
    const registerButton = document.querySelector("[name='register']");
    const formResponseSpanElement = document.querySelector(".form-response span");
    
    const URL = `${location.href}/register.php`;

    registerButton.addEventListener('click', (e) => {

        e.preventDefault(); // prevent form submission on initial click

        let usernameData = ( middlename.value.length > 0 ) ? `${firstname.value} ${middlename.value} ${lastname.value}` : `${firstname.value} ${lastname.value}`;
        let qrCodeId = ( middlename.value.length > 0 ) ? `${firstname.value}${middlename.value}${lastname.value}${Date.now()}` : `${firstname.value}${lastname.value}${Date.now()}`;

        // remove apostrophe's from username and qrcodeId
        usernameData = usernameData.replace(/'/g, '');
        qrCodeId = qrCodeId.replace(/'/g, '');

        // generateUserQRCode(usernameData, generatedImage);
        generateUserQRCode(usernameData, qrCodeId, generatedImage);

        const formData = new FormData();

        setTimeout(() => {

            //console.log(generatedImage.files);

            formData.append('firstname', firstname.value);
            formData.append('middlename', middlename.value);
            formData.append('lastname', lastname.value);
            formData.append('gender', gender.options[gender.selectedIndex].value);
            formData.append('fellowshipgroup', fellowshipgroup.options[fellowshipgroup.selectedIndex].value);
            formData.append('category', category.options[category.selectedIndex].value);
            formData.append('department', department.options[department.selectedIndex].value);
            formData.append('region', region.value);
            formData.append('email', email.value);
            formData.append('phone', phone.value);
            formData.append('passportnumber', passportnumber.value);
            formData.append('placeofstay', placeofstay.value);
            formData.append('qrcodeid', qrCodeId);
            formData.append('file', generatedImage.files[0]);

            // send data to database here
            
            fetch(URL, {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then((data) => {

                //console.log(data);

                if ( data.userExists ) {

                    formResponseSpanElement.className = '';
                    formResponseSpanElement.className = 'error';
                    formResponseSpanElement.innerHTML = '';
                    formResponseSpanElement.textContent = '';
                    formResponseSpanElement.textContent = `${data.userExistsMessage}`;

                } else if ( data.userCreated ) {

                    formResponseSpanElement.className = '';
                    formResponseSpanElement.className = 'success';
                    formResponseSpanElement.innerHTML = '';
                    formResponseSpanElement.textContent = '';
                    formResponseSpanElement.textContent = `${data.userCreatedMessage}`;

                }
            })
            .catch(err => console.log(err));


        }, 1000);


    });

};

const generateUserQRCode = async (username, qrcodeid, generatedImageElement ) => {
    const qrCodeImage = document.querySelector('.qr-code-image');
    qrCodeImage.innerHTML = "";

    await new QRCode(qrCodeImage, {
        text: qrcodeid,
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

const getRegisteredList = () => {
    
    const listWrapper = document.querySelector('.list-wrapper');
    const listSearch = document.querySelector('.list-search');
    const listContainer = document.querySelector('.list-container');

    const getURL = `${location.href}/register_list.php`;

    fetch(getURL)
    .then((response) => response.json())
    .then((responseList) => {

        console.log(responseList);

        if ( responseList.length > 0 ) {
            console.log(responseList);
        }
    })
    .catch(err => console.log(err));

}