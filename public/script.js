document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vcardForm');
    const qrContainer = document.getElementById('qrcode');
    const placeholder = document.getElementById('placeholder');
    const downloadActions = document.getElementById('download-actions');
    const qrLink = document.getElementById('qr-link');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            job_title: document.getElementById('job_title').value,
            company: document.getElementById('company').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            address: document.getElementById('address').value,
            facebook: document.getElementById('facebook').value,
            qr_color: document.getElementById('qr_color').value,
            bg_color: document.getElementById('bg_color').value
        };

        try {
            const response = await fetch('/api/vcard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (result.id) {
                const baseUrl = 'http://192.168.1.100:3000';
                const qrUrl = `${baseUrl}/vcard/${result.id}`;
                
                qrContainer.innerHTML = '';
                qrContainer.style.display = 'block';
                placeholder.style.display = 'none';
                downloadActions.style.display = 'block';
                qrLink.textContent = `Link: ${qrUrl}`;

                new QRCode(qrContainer, {
                    text: qrUrl,
                    width: 200,
                    height: 200,
                    colorDark: data.qr_color,
                    colorLight: data.bg_color
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save contact.');
        }
    });

    document.getElementById('downloadPNG').addEventListener('click', () => {
        const img = qrContainer.querySelector('img');
        if (img) {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = 'vcard-qr.png';
            link.click();
        }
    });
});