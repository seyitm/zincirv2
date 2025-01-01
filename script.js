document.addEventListener('DOMContentLoaded', function() {
    const months = [
        'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN',
        'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'
    ];

    // Local Storage'dan verileri yükle
    let checkedDates = JSON.parse(localStorage.getItem('checkedDates')) || {};
    let hedef = localStorage.getItem('hedef') || '';

    // Header'ı oluştur
    function createHeader() {
        const headerRow = document.getElementById('header-row');
        for (let i = 1; i <= 31; i++) {
            const th = document.createElement('th');
            th.textContent = i;
            headerRow.appendChild(th);
        }
    }

    // Hedef input'unu ayarla
    const hedefInput = document.getElementById('hedef');
    hedefInput.value = hedef;

    // Hedef değişikliğini kaydet
    hedefInput.addEventListener('input', function(e) {
        hedef = e.target.value;
        localStorage.setItem('hedef', hedef);
    });

    // Takvimi oluştur
    function createCalendar() {
        const tbody = document.querySelector('#calendar tbody');
        tbody.innerHTML = '';

        months.forEach(month => {
            const tr = document.createElement('tr');
            
            // Ay ismi
            const monthCell = document.createElement('td');
            monthCell.textContent = month;
            monthCell.className = 'month-cell';
            tr.appendChild(monthCell);

            // Günler
            for (let i = 1; i <= 31; i++) {
                const td = document.createElement('td');
                td.textContent = i;
                
                const dateKey = `${month}-${i}`;
                
                if (checkedDates[dateKey]) {
                    td.classList.add('checked');
                }

                td.addEventListener('click', function() {
                    toggleDate(td, dateKey);
                });

                tr.appendChild(td);
            }

            tbody.appendChild(tr);
        });
    }

    // Tarihi işaretle/işareti kaldır
    function toggleDate(td, dateKey) {
        if (td.classList.contains('checked')) {
            td.classList.remove('checked');
            delete checkedDates[dateKey];
        } else {
            td.classList.add('checked');
            checkedDates[dateKey] = true;
        }
        
        localStorage.setItem('checkedDates', JSON.stringify(checkedDates));
    }

    // Header ve takvimi oluştur
    createHeader();
    createCalendar();
});