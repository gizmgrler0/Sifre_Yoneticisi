// Şifre göster/gizle butonu
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.textContent = type === 'text' ? 'Gizle' : 'Göster';
  });
  
  // Form gönderildiğinde
  document.getElementById('passwordForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const site = document.getElementById('site').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const entry = { site, username, password };
  
    let entries = JSON.parse(localStorage.getItem('passwordEntries')) || [];
    entries.push(entry);
    localStorage.setItem('passwordEntries', JSON.stringify(entries));
  
    this.reset();
    document.getElementById('togglePassword').textContent = 'Göster';
    document.getElementById('password').setAttribute('type', 'password');
  
    showPasswords();
  });
  
  // Kayıtlı şifreleri göster
  function showPasswords() {
    const list = document.getElementById('passwordList');
    list.innerHTML = '';
  
    const entries = JSON.parse(localStorage.getItem('passwordEntries')) || [];
  
    if (entries.length === 0) {
      list.innerHTML = '<p class="text-muted">Henüz kayıtlı şifre yok.</p>';
      return;
    }
  
    entries.forEach((entry, index) => {
      const card = document.createElement('div');
      card.className = 'card mb-3';
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${entry.site}</h5>
          <p class="card-text"><strong>Kullanıcı Adı:</strong> ${entry.username}</p>
          <p class="card-text">
            <strong>Şifre:</strong>
            <span id="pass-${index}">••••••••</span>
            <button class="btn btn-sm btn-outline-secondary ms-2" onclick="toggleShow(${index}, '${entry.password}')">Göster</button>
          </p>
          <button class="btn btn-sm btn-danger" onclick="deleteEntry(${index})">Sil</button>
        </div>
      `;
      list.appendChild(card);
    });
  }
  
  // Şifreyi göster/gizle
  function toggleShow(index, password) {
    const passEl = document.getElementById(`pass-${index}`);
    if (passEl.textContent === '••••••••') {
      passEl.textContent = password;
    } else {
      passEl.textContent = '••••••••';
    }
  }
  
  // Kayıt sil
  function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('passwordEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('passwordEntries', JSON.stringify(entries));
    showPasswords();
  }
  
  // Sayfa yüklendiğinde şifreleri göster
  window.onload = showPasswords;
  