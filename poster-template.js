// KSIJ Poster - FULLY EDITABLE Template with Real QR Code
const POSTER_TEMPLATE = `
<div class="poster" id="poster">
  <style>
.top-border{height:10px;background:linear-gradient(90deg,#7a4e00,#d4a017,#f5d155,#ffffff,#f5d155,#d4a017,#7a4e00)}
.header{position:relative;background:#2a9d4e;overflow:hidden}
.header::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 70 70'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.13)' stroke-width='1'%3E%3Cpolygon points='35,4 42,22 60,22 46,34 51,52 35,41 19,52 24,34 10,22 28,22'/%3E%3Cpolygon points='35,14 40,26 53,26 43,34 47,47 35,39 23,47 27,34 17,26 30,26' stroke-width='0.5' opacity='0.5'/%3E%3Ccircle cx='35' cy='35' r='4' stroke-width='0.8'/%3E%3C/g%3E%3C/svg%3E");background-size:70px 70px;pointer-events:none}
.header::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(255,255,255,0.18) 0%,transparent 65%);pointer-events:none}
.header-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:30px 48px 0;gap:18px}
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
.day-band .dhijri{font-size:17px;font-weight:700;color:#fff;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;position:relative;z-index:1}
.day-body{padding:14px 18px 16px}
.prayers{width:100%;border-collapse:collapse;margin-bottom:8px;border:1.5px solid #d0ead8;border-radius:6px;overflow:hidden}
.prayers tr{border-bottom:1.5px solid #d0ead8}
.prayers tr:last-child{border-bottom:none}
.prayers td{padding:7px 12px;font-size:15px}
.prayers td.pl{font-weight:600;color:#222;text-transform:uppercase;letter-spacing:0.4px;background:#f2fbf5}
.prayers td.pt{font-weight:800;color:#1e7a3c;text-align:right;background:#f2fbf5;letter-spacing:0.8px;white-space:nowrap;font-size:15.5px}
.notice{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:5px solid #2a9d4e;padding:8px 12px;margin-bottom:12px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(42,157,78,0.1);position:relative}
.notice p{font-size:15px;font-weight:700;color:#1b5e20;letter-spacing:0.3px;line-height:1.5}
.notice-shahadat{background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-left-color:#424242}
.notice-shahadat p{color:#212121}
.notice-wiladat{background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left-color:#c62828}
.notice-wiladat p{color:#b71c1c}
.prog-header-box{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:5px solid #2a9d4e;padding:10px 12px;margin-bottom:12px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(42,157,78,0.1)}
.prog-header-box-shahadat{background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-left-color:#424242}
.prog-header-box-shahadat .prog-event-title{color:#212121}
.prog-header-box-wiladat{background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left-color:#c62828}
.prog-header-box-wiladat .prog-event-title{color:#b71c1c}
.prog-event-title{font-size:16px;font-weight:800;color:#1b5e20;letter-spacing:0.3px;text-transform:uppercase;line-height:1.4;margin-bottom:0}
.prog-badge{background:#2d2d2d;color:#fff;font-size:11px;font-weight:800;letter-spacing:1.2px;padding:4px 12px;border-radius:4px;text-transform:uppercase;display:inline-block;margin-top:8px}
.prog-badge-shahadat{background:#424242}
.prog-badge-wiladat{background:#c62828}
.schedule{margin-bottom:12px}
.schedule-table{width:100%;border-collapse:collapse}
.schedule-table tr td{padding:6px 0;font-size:16px;font-weight:600;color:#2d2d2d;letter-spacing:0.3px;line-height:1.5}
.schedule-table tr td:first-child{text-align:left}
.schedule-table tr td:last-child{text-align:right;font-weight:800;color:#1e7a3c;white-space:nowrap}
.programme-section{display:none;margin-top:8px}
.programme-section.active{display:block}
.add-programme-btn,.add-notice-btn,.add-item-btn,.add-prayer-btn{background:#e8f5e9;border:2px dashed #a8d8b8;color:#1e7a3c;padding:6px 10px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;text-align:center;margin:6px 0;transition:all 0.2s;display:block}
.add-programme-btn:hover,.add-notice-btn:hover,.add-item-btn:hover,.add-prayer-btn:hover{background:#c8e6c9;border-color:#2a9d4e}
.hadith-strip-wrap{padding:0 28px 22px}
.hadith-strip{background:linear-gradient(135deg,#2a9d4e 0%,#1e7a3c 100%);border-radius:12px;padding:24px 32px;box-shadow:0 6px 24px rgba(0,0,0,0.15);border:3px solid #d4a017;position:relative;overflow:hidden}
.hadith-strip::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,5 36,22 53,22 40,32 45,49 30,39 15,49 20,32 7,22 24,22' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 60px;pointer-events:none}
.hadith-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;font-style:italic;color:#f5d155;text-align:center;margin-bottom:14px;letter-spacing:1px;position:relative;z-index:1}
.hadith-text{font-size:16px;font-weight:500;color:#fff;text-align:center;line-height:1.7;letter-spacing:0.3px;position:relative;z-index:1}
.footer-strip{background:#fff;padding:16px 28px;border-top:3px solid #2a9d4e}
.footer-content{display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg,#1a7a38,#2a9d4e);padding:14px 20px;border-radius:8px}
.footer-left{display:flex;flex-direction:column;gap:2px}
.ftitle{font-size:11px;font-weight:700;color:rgba(255,255,255,0.85);letter-spacing:1.5px;text-transform:uppercase}
.fname{font-size:18px;font-weight:800;color:#fff;letter-spacing:1px;text-transform:uppercase}
.footer-right{display:flex;align-items:center;gap:12px}
.social-icon{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#fff;transition:transform 0.2s}
.social-icon svg{width:22px;height:22px}
.qr-code{width:38px;height:38px;background:#fff;display:flex;align-items:center;justify-content:center;border-radius:4px;overflow:hidden}
.qr-code img{width:100%;height:100%;object-fit:contain}
.bottom-border{height:10px;background:linear-gradient(90deg,#7a4e00,#d4a017,#f5d155,#ffffff,#f5d155,#d4a017,#7a4e00)}
  </style>
  
  <div class="top-border"></div>
  
  <div class="header">
    <div class="header-content">
      <div class="title-block">
        <div class="location" contenteditable="true">KAMPALA · UGANDA</div>
        <h1 class="org-name" contenteditable="true">Khoja Shia Ithnasheri Jamat</h1>
      </div>
      <div class="weekly-wrap">
        <h2 class="weekly" contenteditable="true">Weekly</h2>
        <h3 class="programme" contenteditable="true">Programme</h3>
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
      
      <div class="col-panel">
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Monday 22nd Dec. 2025</div>
            <div class="dhijri" contenteditable="true">1ST RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Zohrain Adhan</td><td class="pt" contenteditable="true">12:49 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:06 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('mon')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('mon')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('mon')">+ Add Programme</button>
            <div class="programme-section" id="prog-mon">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('mon')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Wednesday 24th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">3RD RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Zohrain Adhan</td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('wed')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('wed')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('wed')">+ Add Programme</button>
            <div class="programme-section" id="prog-wed">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('wed')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Friday 26th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">5TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:41 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Juma Adhan</td><td class="pt" contenteditable="true">12:51 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:08 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('fri')">+ Add Prayer Row</button>
            <div class="notice"><p contenteditable="true">Followed by Khutbah and Juma Prayers</p></div>
            <button class="add-notice-btn" onclick="addNoticeBox('fri')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('fri')">+ Add Programme</button>
            <div class="programme-section" id="prog-fri">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('fri')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Sunday 28th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">7TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:42 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Zohrain Adhan</td><td class="pt" contenteditable="true">12:52 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:09 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('sun')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('sun')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('sun')">+ Add Programme</button>
            <div class="programme-section" id="prog-sun">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('sun')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-panel">
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Tuesday 23rd Dec. 2025</div>
            <div class="dhijri" contenteditable="true">2ND RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Zohrain Adhan</td><td class="pt" contenteditable="true">12:49 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('tue')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('tue')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('tue')">+ Add Programme</button>
            <div class="programme-section" id="prog-tue">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('tue')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Thursday 25th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">4TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:41 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Zohrain Adhan</td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:08 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('thu')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('thu')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('thu')">+ Add Programme</button>
            <div class="programme-section" id="prog-thu">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('thu')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
        
        <div class="day-section">
          <div class="day-band">
            <div class="dname" contenteditable="true">Saturday 27th Dec. 2025</div>
            <div class="dhijri" contenteditable="true">6TH RAJAB 1447</div>
          </div>
          <div class="day-body">
            <table class="prayers">
              <tr><td class="pl" contenteditable="true">Fajr Adhan</td><td class="pt" contenteditable="true">05:42 A.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Zohrain Adhan</td><td class="pt" contenteditable="true">12:51 P.M.</td></tr>
              <tr><td class="pl" contenteditable="true">Maghrebain Prayers</td><td class="pt" contenteditable="true">07:09 P.M.</td></tr>
            </table>
            <button class="add-prayer-btn" onclick="addPrayerRow('sat')">+ Add Prayer Row</button>
            <button class="add-notice-btn" onclick="addNoticeBox('sat')">+ Add Notice</button>
            <button class="add-programme-btn" onclick="toggleProgramme('sat')">+ Add Programme</button>
            <div class="programme-section" id="prog-sat">
              <div class="prog-header-box">
                <div class="prog-event-title" contenteditable="true">PROGRAMME TITLE</div>
                <span class="prog-badge" contenteditable="true">PROGRAMME</span>
              </div>
              <div class="schedule">
                <table class="schedule-table">
                  <tr><td contenteditable="true">Programme Item</td><td contenteditable="true">08:15 P.M.</td></tr>
                </table>
              </div>
              <button class="add-item-btn" onclick="addScheduleItem('sat')">+ Add Schedule Item</button>
              <div class="notice"><p contenteditable="true">Details here</p></div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
  <div class="hadith-strip-wrap">
    <div class="hadith-strip">
      <div class="hadith-title" contenteditable="true">Hazrat Muhammad Mustafa (S) Said</div>
      <div class="hadith-text" contenteditable="true">IMAM JA'FAR SADIQ (A.S.) NARRATES THAT THE HOLY PROPHET (S.A.W.S.) SAID, "ONE WHO WALKS ON EARTH PROUDLY, THE EARTH AND ALL THE CREATURES ABOVE AND BELOW IT CURSE HIM."</div>
    </div>
  </div>
  
  <div class="footer-strip">
    <div class="footer-content">
      <div class="footer-left">
        <div class="ftitle" contenteditable="true">FOLLOW US</div>
        <div class="fname" contenteditable="true">KSIJ KAMPALA</div>
      </div>
      <div class="footer-right">
        <div class="social-icon">
          <svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </div>
        <div class="social-icon">
          <svg viewBox="0 0 24 24" fill="url(#instagram-gradient)"><defs><linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#FDC366"/><stop offset="50%" style="stop-color:#E1306C"/><stop offset="100%" style="stop-color:#C13584"/></linearGradient></defs><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </div>
        <div class="social-icon">
          <svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </div>
        <div class="qr-code">
          <img src="data:image/png;base64,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
1NTU0H//2Q==" alt="QR Code">
        </div>
      </div>
    </div>
  </div>
  
  <div class="bottom-border"></div>
</div>
`;
