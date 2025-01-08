window.addEventListener('DOMContentLoaded', () => {

    let scannedQrCode = '';
    let loginURL = 'http://localhost/checkin/login.php';

    document.addEventListener('keypress', (event) => {

        if ( event.key === "Enter" ) {
            if ( scannedQrCode ) {
                sendCodeForAuthentication(scannedQrCode);
                scannedQrCode = '';
                return;
            }
        }

        if ( event.key !== "Shift" ) {
            scannedQrCode += event.key;
        }

    });

    const sendCodeForAuthentication = (value) => {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append('qrcodeid', value);

            fetch(loginURL, {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then((reply) => {
                console.log(reply);
                resolve();
            })
            .catch((e) => {
                console.log(`Exception for QR Code Login :${e}`);
                reject(e);
            });
        });
    };

});