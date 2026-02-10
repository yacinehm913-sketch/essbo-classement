// دالة إضافة المعدل
function addGrade() {
    const name = document.getElementById('name').value;
    const grade = parseFloat(document.getElementById('grade').value);
    
    if (!name || !grade) {
        showMessage('الرجاء إدخال جميع البيانات', 'error');
        return;
    }
    
    if (grade < 0 || grade > 100) {
        showMessage('المعدل يجب أن يكون بين 0 و 100', 'error');
        return;
    }
    
    // إضافة إلى Firebase
    db.collection('grades').add({
        name: name,
        grade: grade,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        showMessage('تم إضافة المعدل بنجاح!', 'success');
        document.getElementById('name').value = '';
        document.getElementById('grade').value = '';
    })
    .catch(error => {
        showMessage('حدث خطأ: ' + error.message, 'error');
    });
}

// دالة تحميل وعرض المعدلات
function loadGrades() {
    db.collection('grades')
        .orderBy('grade', 'desc')
        .get()
        .then(querySnapshot => {
            const gradesList = document.getElementById('gradesList');
            gradesList.innerHTML = '';
            
            let rank = 1;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const row = document.createElement('tr');
                
                // إضافة ميدالية للثلاثة الأوائل
                let medal = '';
                if (rank === 1) medal = '<span class="medal gold">🥇</span>';
                else if (rank === 2) medal = '<span class="medal silver">🥈</span>';
                else if (rank === 3) medal = '<span class="medal bronze">🥉</span>';
                
                row.innerHTML = `
                    <td>${rank} ${medal}</td>
                    <td>${data.name}</td>
                    <td><strong>${data.grade.toFixed(2)}</strong></td>
                `;
                gradesList.appendChild(row);
                rank++;
            });
            
            if (rank === 1) {
                gradesList.innerHTML = `
                    <tr>
                        <td colspan="3" style="text-align: center; padding: 40px;">
                            <i class="fas fa-info-circle" style="color: #666; font-size: 24px;"></i>
                            <br>لا توجد بيانات بعد. كن أول من يضيف معدله!
                        </td>
                    </tr>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading grades:', error);
        });
}

// دوال مساعدة
function showMessage(text, type) {
    const msg = document.getElementById('message');
    msg.textContent = text;
    msg.className = `message ${type}`;
    msg.style.display = 'block';
    
    setTimeout(() => {
        msg.style.display = 'none';
    }, 5000);
}

function showTab(tabName) {
    document.getElementById('addTab').style.display = tabName === 'add' ? 'block' : 'none';
    document.getElementById('viewTab').style.display = tabName === 'view' ? 'block' : 'none';
    
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.currentTarget.classList.add('active');
    
    if (tabName === 'view') {
        loadGrades();
    }
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadGrades();
});