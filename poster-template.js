// KSIJ Poster HTML Template - Full 7 Days
const POSTER_TEMPLATE = `
<div class="poster" id="poster">
  <style>
.top-border{height:10px;background:linear-gradient(90deg,#7a4e00,#d4a017,#f5d155,#ffffff,#f5d155,#d4a017,#7a4e00)}
.header{position:relative;background:#2a9d4e;overflow:hidden}
.header::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 70 70'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.13)' stroke-width='1'%3E%3Cpolygon points='35,4 42,22 60,22 46,34 51,52 35,41 19,52 24,34 10,22 28,22'/%3E%3Cpolygon points='35,14 40,26 53,26 43,34 47,47 35,39 23,47 27,34 17,26 30,26' stroke-width='0.5' opacity='0.5'/%3E%3Ccircle cx='35' cy='35' r='4' stroke-width='0.8'/%3E%3C/g%3E%3C/svg%3E");background-size:70px 70px;pointer-events:none}
.header::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(255,255,255,0.18) 0%,transparent 65%);pointer-events:none}
.header-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:30px 48px 0;gap:18px}
.brand-row{display:flex;align-items:center;gap:22px}
.title-block{text-align:center}
.location{font-size:14px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:3px;text-transform:uppercase;margin-bottom:8px}
.org-name{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:#fff;letter-spacing:1px;line-height:1.2;text-shadow:0 2px 12px rgba(0,0,0,0.25)}
.weekly-wrap{text-align:center;padding-bottom:24px}
.weekly{font-family:'Playfair Display',serif;font-size:78px;font-weight:900;color:#fff;letter-spacing:4px;line-height:1;text-shadow:0 4px 20px rgba(0,0,0,0.35);display:block}
.programme{font-family:'Playfair Display',serif;font-size:82px;font-weight:700;font-style:italic;color:#f5d155;letter-spacing:2px;line-height:1;text-shadow:0 4px 20px rgba(0,0,0,0.3);display:block;margin-top:-4px}
.header-arch{position:relative;z-index:2;line-height:0}
.header-arch svg{display:block;width:100%}
.date-strip-wrap{margin-top:-2px;padding:0 28px}
.date-strip{background:linear-gradient(135deg,#1a7a38,#2a9d4e 40%,#1a7a38);border-radius:0 0 10px 10px;padding:32px 40px;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,0.22);border-left:6px solid #d4a017;border-right:6px solid #d4a017;border-bottom:5px solid #d4a017;position:relative;z-index:5}
.date-strip p{font-size:20px;font-weight:800;color:#fff;letter-spacing:2.5px;text-transform:uppercase;margin:4px 0}
.body-wrap{padding:22px 28px 0}
.content-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.col-panel{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,0.11);border:2px solid #a8d8b8;position:relative}
.col-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#2a9d4e,#f5d155,#2a9d4e);z-index:2}
.day-section{position:relative}
.day-section+.day-section{border-top:4px solid #2a9d4e}
.day-band{background:linear-gradient(105deg,#2a9d4e 60%,#34b85f);padding:13px 18px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden}
.day-band::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpolygon points='25,3 30,18 45,18 33,27 38,42 25,33 12,42 17,27 5,18 20,18' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/svg%3E");background-size:50px 50px;pointer-events:none}
.day-band .dname{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#fff;position:relative;z-index:1}
.day-band .dhijri{font-size:17px;font-weight:700;color:#ffffff;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;position:relative;z-index:1}
.day-body{padding:14px 18px 16px}
.prayers{width:100%;border-collapse:collapse;margin-bottom:12px;border:1.5px solid #d0ead8;border-radius:6px;overflow:hidden}
.prayers tr{border-bottom:1.5px solid #d0ead8}
.prayers tr:last-child{border-bottom:none}
.prayers td{padding:7px 12px;font-size:15px}
.prayers td.pl{font-weight:600;color:#222;text-transform:uppercase;letter-spacing:0.4px;background:#f2fbf5}
.prayers td.pt{font-weight:800;color:#1e7a3c;text-align:right;background:#f2fbf5;letter-spacing:0.8px;white-space:nowrap;font-size:15.5px}
.notice{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:5px solid #2a9d4e;padding:8px 12px;margin-bottom:12px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(42,157,78,0.1)}
.notice p{font-size:15px;font-weight:700;color:#1b5e20;letter-spacing:0.3px;line-height:1.5}
.notice-shahadat{background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-left-color:#424242}
.notice-shahadat p{color:#212121}
.notice-wiladat{background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left-color:#c62828}
.notice-wiladat p{color:#b71c1c}
.prog-head{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.prog-badge{background:linear-gradient(135deg,#2a9d4e,#1e7a3c);color:#fff;font-size:11px;font-weight:800;letter-spacing:1.2px;padding:5px 12px;border-radius:5px;text-transform:uppercase;box-shadow:0 2px 6px rgba(42,157,78,0.3)}
.prog-badge-shahadat{background:linear-gradient(135deg,#424242,#212121);box-shadow:0 2px 6px rgba(33,33,33,0.4)}
.prog-badge-wiladat{background:linear-gradient(135deg,#c62828,#b71c1c);box-shadow:0 2px 6px rgba(198,40,40,0.4)}
.prog-title{font-size:19px;font-weight:800;color:#1a1a1a;letter-spacing:0.5px;text-transform:uppercase;margin-bottom:10px;line-height:1.3}
.schedule{margin-bottom:12px}
.schedule p{font-size:16px;font-weight:600;color:#2d2d2d;letter-spacing:0.3px;line-height:1.65;margin:3px 0}
.programme-section{display:none;margin-top:12px}
.programme-section.active{display:block}
.hadith-strip-wrap{padding:0 28px 22px}
.hadith-strip{background:linear-gradient(135deg,#2a9d4e 0%,#1e7a3c 100%);border-radius:12px;padding:24px 32px;box-shadow:0 6px 24px rgba(0,0,0,0.15);border:3px solid #d4a017;position:relative;overflow:hidden}
.hadith-strip::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,5 36,22 53,22 40,32 45,49 30,39 15,49 20,32 7,22 24,22' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 60px;pointer-events:none}
.hadith-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;font-style:italic;color:#f5d155;text-align:center;margin-bottom:14px;letter-spacing:1px;position:relative;z-index:1}
.hadith-text{font-size:16px;font-weight:500;color:#fff;text-align:center;line-height:1.7;letter-spacing:0.3px;position:relative;z-index:1}
.footer-strip{background:linear-gradient(135deg,#1a7a38,#2a9d4e);padding:20px 40px;display:flex;align-items:center;justify-content:space-between}
.footer-left{display:flex;flex-direction:column;gap:4px}
.ftitle{font-size:13px;font-weight:700;color:rgba(255,255,255,0.75);letter-spacing:2px;text-transform:uppercase}
.fname{font-size:22px;font-weight:800;color:#fff;letter-spacing:1px;text-transform:uppercase}
.bottom-border{height:10px;background:linear-gradient(90deg,#7a4e00,#d4a017,#f5d155,#ffffff,#f5d155,#d4a017,#7a4e00)}
.add-programme-btn{background:#e2e8f0;border:2px dashed #cbd5e0;color:#4a5568;padding:8px 12px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;text-align:center;margin-top:8px;transition:all 0.2s}
.add-programme-btn:hover{background:#cbd5e0;border-color:#a0aec0}
  </style>
  
  <div class="top-border"></div>
  
  <div class="header">
    <div class="header-content">
      <div class="brand-row">
        <div class="title-block">
          <div class="location">KAMPALA · UGANDA</div>
          <h1 class="org-name">Khoja Shia Ithnasheri Jamat</h1>
        </div>
      </div>
      <div class="weekly-wrap">
        <h2 class="weekly">Weekly</h2>
        <h3 class="programme">Programme</h3>
      </div>
    </div>
    <div class="header-arch">
      <svg viewBox="0 0 1080 60" preserveAspectRatio="none">
        <path d="M0,30 Q270,0 540,30 T1080,30 L1080,60 L0,60 Z" fill="#f7f4ee"/>
      </svg>
    </div>
  </div>
  
  <div class="date-strip-wrap">
    <div class="date-strip">
      <p contenteditable="true">22ND DEC - 28TH DEC 2025</p>
      <p contenteditable="true">1ST - 7TH RAJAB 1447</p>
    </div>
  </div>
  
  <div class="body-wrap">
    <div class="content-grid">
      
      <!-- LEFT COLUMN -->
      <div class="col-panel">
        
        <!-- Monday -->
        <div class="day-section" data-day="monday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Monday 22nd Dec. 2025</div>
            <div class="dhijri" contenteditable="true">1ST RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl">Zohrain Adhan</td><td class="pt" contenteditable="true">12:49 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:06 P.M.</td></tr>
            </table>
            <div class="add-programme-btn" onclick="toggleProgramme('monday')">+ Add Programme</div>
            <div class="programme-section" id="prog-monday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
        <!-- Wednesday -->
        <div class="day-section" data-day="wednesday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Wednesday 24th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">3RD RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl">Zohrain Adhan</td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
            </table>
            <div class="add-programme-btn" onclick="toggleProgramme('wednesday')">+ Add Programme</div>
            <div class="programme-section" id="prog-wednesday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
        <!-- Friday -->
        <div class="day-section" data-day="friday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Friday 26th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">5TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:41 A.M.</td></tr>
              <tr><td class="pl">Juma Adhan</td><td class="pt" contenteditable="true">12:51 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:08 P.M.</td></tr>
            </table>
            <div class="notice"><p contenteditable="true">Followed by Khutbah and Juma Prayers</p></div>
            <div class="add-programme-btn" onclick="toggleProgramme('friday')">+ Add Programme</div>
            <div class="programme-section" id="prog-friday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
        <!-- Sunday -->
        <div class="day-section" data-day="sunday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Sunday 28th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">7TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:42 A.M.</td></tr>
              <tr><td class="pl">Zohrain Adhan</td><td class="pt" contenteditable="true">12:52 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:09 P.M.</td></tr>
            </table>
            <div class="add-programme-btn" onclick="toggleProgramme('sunday')">+ Add Programme</div>
            <div class="programme-section" id="prog-sunday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
      </div>
      
      <!-- RIGHT COLUMN -->
      <div class="col-panel">
        
        <!-- Tuesday -->
        <div class="day-section" data-day="tuesday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Tuesday 23rd Dec. 2025</div>
            <div class="dhijri" contenteditable="true">2ND RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl">Zohrain Adhan</td><td class="pt" contenteditable="true">12:49 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
            </table>
            <div class="add-programme-btn" onclick="toggleProgramme('tuesday')">+ Add Programme</div>
            <div class="programme-section" id="prog-tuesday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
        <!-- Thursday -->
        <div class="day-section" data-day="thursday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Thursday 25th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">4TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:41 A.M.</td></tr>
              <tr><td class="pl">Zohrain Adhan</td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:08 P.M.</td></tr>
            </table>
            <div class="add-programme-btn" onclick="toggleProgramme('thursday')">+ Add Programme</div>
            <div class="programme-section" id="prog-thursday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
        <!-- Saturday -->
        <div class="day-section" data-day="saturday">
          <div class="day-band">
            <div class="dname" contenteditable="true">Saturday 27th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">6TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl">Fajr Adhan</td><td class="pt" contenteditable="true">05:42 A.M.</td></tr>
              <tr><td class="pl">Zohrain Adhan</td><td class="pt" contenteditable="true">12:51 P.M.</td></tr>
              <tr><td class="pl">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:09 P.M.</td></tr>
            </table>
            <div class="add-programme-btn" onclick="toggleProgramme('saturday')">+ Add Programme</div>
            <div class="programme-section" id="prog-saturday">
              <div class="prog-head">
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="prog-title" contenteditable="true">Programme Title</div>
              <div class="schedule">
                <p contenteditable="true">8:15 P.M. Programme Item</p>
              </div>
              <div class="notice"><p contenteditable="true">Programme details here</p></div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  </div>
  
  <div class="hadith-strip-wrap">
    <div class="hadith-strip">
      <div class="hadith-title">Hazrat Muhammad Mustafa (S) Said</div>
      <div class="hadith-text" contenteditable="true">IMAM JA'FAR SADIQ (A.S.) NARRATES THAT THE HOLY PROPHET (S.A.W.S.) SAID, "ONE WHO WALKS ON EARTH PROUDLY, THE EARTH AND ALL THE CREATURES ABOVE AND BELOW IT CURSE HIM."</div>
    </div>
  </div>
  
  <div class="footer-strip">
    <div class="footer-left">
      <div class="ftitle">FOLLOW US</div>
      <div class="fname">KSIJ KAMPALA</div>
    </div>
    <div class="footer-right">
      <div style="font-size:9px;font-weight:700;color:#fff;letter-spacing:1.5px;text-transform:uppercase;">Facebook · Instagram · YouTube</div>
    </div>
  </div>
  
  <div class="bottom-border"></div>
</div>
`;

// Toggle programme visibility
function toggleProgramme(day) {
  const progSection = document.getElementById('prog-' + day);
  const btn = event.target;
  
  if (progSection.classList.contains('active')) {
    progSection.classList.remove('active');
    btn.textContent = '+ Add Programme';
  } else {
    progSection.classList.add('active');
    btn.textContent = '- Remove Programme';
  }
}
