document.addEventListener('DOMContentLoaded', async function() {
    // Initialize IndexedDB
    try {
        await initDB();
        
        const formContainer = document.getElementById('formContainer');
        const dataContainer = document.getElementById('dataContainer');
        const displayName = document.getElementById('displayName');
        const displayPhone = document.getElementById('displayPhone');
        
        // Get data from IndexedDB
        const userData = await getData();
        
        if (userData && userData.userName && userData.userPhone) {
            // Display data if it exists
            formContainer.style.display = 'none';
            dataContainer.style.display = 'flex';
            displayName.textContent = userData.userName;
            displayPhone.textContent = userData.userPhone;
        } else {
            // Show form if no data exists
            formContainer.style.display = 'flex';
            dataContainer.style.display = 'none';
        }
        
        // Save button click handler
        document.getElementById('saveBtn').addEventListener('click', async function() {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            if (name && phone) {
                try {
                    // Save to IndexedDB
                    await saveData({ userName: name, userPhone: phone });
                    
                    // Show success message
                    const btn = this;
                    btn.innerHTML = '<i class="fas fa-check"></i> تم الحفظ!';
                    btn.style.background = 'linear-gradient(90deg, var(--success), #01c896)';
                    
                    setTimeout(() => {
                        btn.innerHTML = 'حفظ البيانات <i class="fas fa-save"></i>';
                        btn.style.background = 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)';
                        
                        // Display the data
                        formContainer.style.display = 'none';
                        dataContainer.style.display = 'flex';
                        displayName.textContent = name;
                        displayPhone.textContent = phone;
                    }, 1500);
                } catch (error) {
                    console.error('Error saving data:', error);
                    // Show error message
                    showAlert('حدث خطأ أثناء حفظ البيانات');
                }
            } else {
                // Show validation error
                const inputs = document.querySelectorAll('input');
                inputs.forEach(input => {
                    if (!input.value) {
                        input.style.borderColor = 'var(--accent)';
                        input.style.animation = 'shake 0.5s';
                        
                        setTimeout(() => {
                            input.style.animation = '';
                        }, 500);
                    }
                });
                
                showAlert('الرجاء إدخال جميع البيانات المطلوبة');
            }
        });
        
        // Edit button click handler
        document.getElementById('editBtn').addEventListener('click', async function() {
            dataContainer.style.animation = 'fadeOut 0.5s';
            
            setTimeout(async () => {
                formContainer.style.display = 'flex';
                dataContainer.style.display = 'none';
                dataContainer.style.animation = '';
                
                // Get current data
                const userData = await getData();
                if (userData) {
                    document.getElementById('name').value = userData.userName || '';
                    document.getElementById('phone').value = userData.userPhone || '';
                }
                
                formContainer.style.animation = 'fadeIn 0.5s';
                
                setTimeout(() => {
                    formContainer.style.animation = '';
                }, 500);
            }, 500);
        });
        
    } catch (error) {
        console.error('Error initializing DB:', error);
        showAlert('حدث خطأ في تهيئة قاعدة البيانات');
    }
});

// Helper function to show alerts
function showAlert(message) {
    const alertMsg = document.createElement('div');
    alertMsg.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    alertMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.5s, fadeOut 0.5s 2.5s;
    `;
    
    document.body.appendChild(alertMsg);
    
    setTimeout(() => {
        alertMsg.remove();
    }, 3000);
}
