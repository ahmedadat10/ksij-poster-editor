// KSIJ Poster - FINAL PERFECT VERSION
const POSTER_TEMPLATE = `
<div class="poster" id="poster">
  <style>
/* ===== BACKGROUND TEXTURE ===== */
.poster{position:relative;width:1080px;background:#f7f4ee;overflow:hidden}
.poster::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='rgba(42,157,78,0.04)' stroke-width='1'%3E%3Cpath d='M60,20 L80,40 L80,80 L40,80 L40,40 Z M50,30 L70,50 L70,70 L50,70 Z'/%3E%3Ccircle cx='60' cy='60' r='25' opacity='0.3'/%3E%3Cpolygon points='60,35 70,55 90,55 75,67 80,87 60,75 40,87 45,67 30,55 50,55'/%3E%3C/g%3E%3C/svg%3E");background-size:120px 120px;opacity:0.4;pointer-events:none;z-index:0}

/* ===== GOLDEN FRAME ===== */
.golden-frame{position:absolute;inset:0;pointer-events:none;z-index:10000}
.golden-frame::before{content:'';position:absolute;inset:0;border:8px solid transparent;border-image:linear-gradient(135deg,#1a7a38,#2a9d4e 25%,#34b85f 50%,#2a9d4e 75%,#1a7a38) 1;box-shadow:inset 0 0 20px rgba(42,157,78,0.3),0 0 30px rgba(42,157,78,0.2)}
.golden-frame::after{content:'';position:absolute;inset:16px;border:2px solid #2a9d4e;border-radius:4px;box-shadow:0 0 15px rgba(42,157,78,0.4)}
.islamic-corner{position:absolute;width:80px;height:80px;pointer-events:none}
.islamic-corner svg{width:100%;height:100%;fill:#2a9d4e;filter:drop-shadow(0 2px 8px rgba(42,157,78,0.6))}
.corner-tl{top:4px;left:4px}
.corner-tr{top:4px;right:4px;transform:rotate(90deg)}
.corner-bl{bottom:4px;left:4px;transform:rotate(-90deg)}
.corner-br{bottom:4px;right:4px;transform:rotate(180deg)}
.top-border{height:10px;background:linear-gradient(90deg,#7a4e00,#d4a017,#f5d155,#ffffff,#f5d155,#d4a017,#7a4e00)}

/* ===== HEADER ===== */
.header{position:relative;background:#2a9d4e;overflow:hidden;z-index:1}
.header::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='70' height='70' viewBox='0 0 70 70'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.13)' stroke-width='1'%3E%3Cpolygon points='35,4 42,22 60,22 46,34 51,52 35,41 19,52 24,34 10,22 28,22'/%3E%3Cpolygon points='35,14 40,26 53,26 43,34 47,47 35,39 23,47 27,34 17,26 30,26' stroke-width='0.5' opacity='0.5'/%3E%3Ccircle cx='35' cy='35' r='4' stroke-width='0.8'/%3E%3C/g%3E%3C/svg%3E");background-size:70px 70px;pointer-events:none}
.header::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,rgba(255,255,255,0.18) 0%,transparent 65%);pointer-events:none}
.header-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:20px 40px 0;gap:14px}
.brand-row{display:flex;align-items:center;gap:18px}
.ksij-logo{width:90px;height:90px;flex-shrink:0;position:relative;border:3px solid #d4a017;border-radius:50%;padding:6px;background:linear-gradient(135deg,#f5d155,#d4a017);box-shadow:0 0 20px rgba(212,160,23,0.6),inset 0 2px 8px rgba(255,255,255,0.3)}
.ksij-logo::before{content:'';position:absolute;inset:-8px;background:radial-gradient(circle,rgba(255,255,255,0.3) 0%,transparent 70%);border-radius:50%;animation:pulse 3s ease-in-out infinite}
.ksij-logo img{width:100%;height:100%;object-fit:cover;position:relative;z-index:1;border-radius:50%;background:#fff}
@keyframes pulse{0%,100%{opacity:0.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
.title-block{text-align:center}
.org-name{font-family:'Playfair Display',serif;font-size:42px;font-weight:700;color:#fff;letter-spacing:1px;line-height:1.2;text-shadow:0 2px 12px rgba(0,0,0,0.25);margin-bottom:8px}
.location{font-size:14px;font-weight:700;color:#f5d155;letter-spacing:3px;text-transform:uppercase;text-shadow:0 2px 8px rgba(212,160,23,0.6)}

/* ===== WEEKLY PROGRAMME - SINGLE LINE ===== */
.weekly-wrap{text-align:center;padding-bottom:16px;position:relative}
.weekly-programme-title{font-family:'Playfair Display',serif;font-size:75px;font-weight:900;line-height:1;text-shadow:0 4px 20px rgba(0,0,0,0.35);display:block}
.word-weekly{color:#fff;font-style:italic;text-shadow:0 4px 20px rgba(0,0,0,0.35);margin-right:20px}
.word-programme{color:#fff;font-style:italic;text-shadow:0 4px 20px rgba(0,0,0,0.35)}

/* Golden Lines and Stars */
.golden-lines{position:absolute;width:100%;top:20px;transform:translateY(-50%);display:flex;justify-content:space-between;align-items:center;padding:0 40px;pointer-events:none}
.golden-line{flex:1;height:2px;background:linear-gradient(90deg,transparent,#f5d155,transparent);position:relative}
.golden-star{width:20px;height:20px;fill:#f5d155;filter:drop-shadow(0 0 8px rgba(245,209,85,0.6))}
.flourish{position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);width:150px;height:20px;fill:#f5d155;opacity:0.8}
.header-arch{position:relative;z-index:2;line-height:0}
.header-arch svg{display:block;width:100%}

/* ===== DATE STRIP - LARGER FONT ===== */
.date-strip-wrap{margin-top:-2px;padding:0 28px;position:relative;z-index:1}
.date-strip{background:linear-gradient(135deg,#1a7a38,#2a9d4e 40%,#1a7a38);border-radius:0 0 10px 10px;padding:20px 40px;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,0.22),inset 0 2px 8px rgba(255,255,255,0.2);border-left:6px solid #d4a017;border-right:6px solid #d4a017;border-bottom:5px solid #d4a017;position:relative;overflow:hidden}
.date-strip::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,5 36,22 53,22 40,32 45,49 30,39 15,49 20,32 7,22 24,22' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 60px;opacity:0.5}
.date-strip p{font-size:24px;font-weight:800;color:#fff;letter-spacing:2.5px;text-transform:uppercase;margin:4px 0;position:relative;z-index:1}
.crescent-icon{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;fill:#f5d155;filter:drop-shadow(0 2px 8px rgba(245,209,85,0.6))}
.crescent-left{left:20px}
.crescent-right{right:20px;transform:translateY(-50%) scaleX(-1)}

/* ===== BODY ===== */
.body-wrap{padding:12px 28px 0;position:relative;z-index:1}
.content-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.col-panel{background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 6px 28px rgba(0,0,0,0.11);border:2px solid #a8d8b8;position:relative}
.col-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#2a9d4e,#f5d155,#2a9d4e);z-index:2}
.day-section{position:relative}
flex:1 1 48%;min-width:400px;
.day-section+.day-section{border-top:4px solid #2a9d4e}
flex:1 1 48%;min-width:400px;
.day-band{background:linear-gradient(105deg,#2a9d4e 60%,#34b85f);padding:10px 16px;display:flex;align-items:center;justify-content:space-between;position:relative;overflow:hidden}
.day-band::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpolygon points='25,3 30,18 45,18 33,27 38,42 25,33 12,42 17,27 5,18 20,18' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/svg%3E");background-size:50px 50px;pointer-events:none}
.day-band .dname{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:#fff;position:relative;z-index:1}
.day-band .dhijri{font-size:17px;font-weight:700;color:#fff;letter-spacing:1.5px;text-transform:uppercase;white-space:nowrap;position:relative;z-index:1}
.day-body{padding:10px 14px 12px}

/* ===== PRAYER TIMES ===== */
.prayers{width:100%;border-collapse:collapse;margin-bottom:6px;border:1.5px solid #d0ead8;border-radius:6px;overflow:hidden}
.prayers tr{border-bottom:1.5px solid #d0ead8;transition:background 0.2s}
.prayers tr:nth-child(even){background:rgba(42,157,78,0.03)}
.prayers tr:last-child{border-bottom:none}
.prayers td{padding:7px 12px;font-size:15px;position:relative}
.prayers td.pl{font-weight:600;color:#222;text-transform:uppercase;letter-spacing:0.4px;background:linear-gradient(90deg,#f2fbf5 0%,rgba(242,251,245,0.5) 100%);padding-left:12px}
.prayers td.pl .prayer-icon{display:inline-block;font-size:14px;cursor:pointer;margin-right:4px;user-select:all}
.prayers td.pt{font-weight:800;color:#1e7a3c;text-align:right;background:linear-gradient(90deg,rgba(242,251,245,0.5) 0%,#f2fbf5 100%);letter-spacing:0.8px;white-space:nowrap;font-size:15.5px}

/* ===== NOTICE BOXES ===== */
.notice{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:5px solid #2a9d4e;padding:8px 12px;margin-bottom:8px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(42,157,78,0.1);position:relative}
.notice p{font-size:15px;font-weight:700;color:#1b5e20;letter-spacing:0.3px;line-height:1.5}
.notice-shahadat{background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-left-color:#424242}
.notice-shahadat p{color:#212121}
.notice-wiladat{background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left-color:#c62828}
.notice-wiladat p{color:#b71c1c}

/* Theme selector buttons */
.theme-selector{position:absolute;top:4px;right:4px;display:flex;gap:4px;opacity:0;transition:opacity 0.2s;z-index:100}
.prog-header-box:hover .theme-selector,.notice:hover .theme-selector{opacity:1}
.theme-btn{width:24px;height:24px;border:2px solid white;border-radius:4px;cursor:pointer;transition:transform 0.2s;font-size:0}
.theme-btn:hover{transform:scale(1.15);box-shadow:0 2px 8px rgba(0,0,0,0.3)}
.theme-btn-green{background:linear-gradient(135deg,#2a9d4e,#34b85f)}
.theme-btn-black{background:linear-gradient(135deg,#424242,#616161)}
.theme-btn-red{background:linear-gradient(135deg,#c62828,#e74c3c)}
.theme-btn.active{border-width:3px;box-shadow:0 0 8px rgba(255,255,255,0.8)}
.notice{position:relative}
.notice .delete-notice{position:absolute;top:4px;right:4px;width:20px;height:20px;background:#e74c3c;color:#fff;border:none;border-radius:50%;cursor:pointer;font-size:14px;font-weight:bold;line-height:18px;text-align:center;opacity:0;transition:opacity 0.2s;z-index:10}
.notice:hover .delete-notice{opacity:1}
.notice .delete-notice:hover{background:#c0392b;transform:scale(1.1)}

/* ===== PROGRAMME ===== */
.prog-header-box{background:linear-gradient(135deg,#e8f5e9,#c8e6c9);border-left:5px solid #2a9d4e;padding:10px 12px;margin-bottom:8px;border-radius:0 6px 6px 0;box-shadow:0 2px 8px rgba(42,157,78,0.1)}
.prog-header-box-shahadat{background:linear-gradient(135deg,#f5f5f5,#e0e0e0);border-left-color:#424242}
.prog-header-box-shahadat .prog-event-title{color:#212121}
.prog-header-box-wiladat{background:linear-gradient(135deg,#ffebee,#ffcdd2);border-left-color:#c62828}
.prog-header-box-wiladat .prog-event-title{color:#b71c1c}
.prog-event-title{font-size:16px;font-weight:800;color:#1b5e20;letter-spacing:0.3px;text-transform:uppercase;line-height:1.4;margin-bottom:0}
.prog-badge{background:#2a9d4e;color:#fff;font-size:11px;font-weight:800;letter-spacing:1.2px;padding:4px 12px;border-radius:4px;text-transform:uppercase;display:inline-block;margin-top:8px}
.prog-badge-regular{background:#2a9d4e}
.prog-badge-shahadat{background:#424242}
.prog-badge-wiladat{background:#c62828}
.schedule{margin-bottom:8px}
.schedule-table{width:100%;border-collapse:collapse}
.schedule-table tr td{padding:6px 0 6px 20px;font-size:16px;font-weight:600;color:#2d2d2d;letter-spacing:0.3px;line-height:1.5;position:relative}
.schedule-table tr td:first-child::before{content:'⭐';position:absolute;left:0;top:50%;transform:translateY(-50%);font-size:12px;color:#f5d155}
.schedule-table tr td:first-child{text-align:left}
.schedule-table tr td:last-child{text-align:right;font-weight:800;color:#1e7a3c;white-space:nowrap;padding-right:0}

/* Programme theme variants for schedule times */
.programme-section.prog-shahadat .schedule-table tr td:last-child{color:#424242}
.programme-section.prog-wiladat .schedule-table tr td:last-child{color:#c62828}
.programme-section{display:none;margin-top:6px}
.programme-section.active{display:block}

/* ===== BUTTONS ===== */
.add-programme-btn,.add-notice-btn,.add-item-btn,.add-prayer-btn{background:#e8f5e9;border:2px dashed #a8d8b8;color:#1e7a3c;padding:5px 8px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;text-align:center;margin:4px 0;transition:all 0.2s;display:block}
.add-programme-btn:hover,.add-notice-btn:hover,.add-item-btn:hover,.add-prayer-btn:hover{background:#c8e6c9;border-color:#2a9d4e}

/* ===== HADITH ===== */
.hadith-strip-wrap{padding:0 28px 12px;position:relative;z-index:1}
.hadith-strip{background:linear-gradient(135deg,#2a9d4e 0%,#1e7a3c 100%);border-radius:12px;padding:16px 24px;box-shadow:0 6px 24px rgba(0,0,0,0.15);border:3px solid #d4a017;position:relative;overflow:hidden}
.hadith-strip::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon points='30,5 36,22 53,22 40,32 45,49 30,39 15,49 20,32 7,22 24,22' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 60px;pointer-events:none}
.hadith-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;font-style:italic;color:#f5d155;text-align:center;margin-bottom:10px;letter-spacing:1px;position:relative;z-index:1}
.hadith-text{font-size:15px;font-weight:500;color:#fff;text-align:center;line-height:1.5;letter-spacing:0.3px;position:relative;z-index:1}

/* ===== FOOTER ===== */
.footer-strip{background:#fff;padding:12px 28px;border-top:3px solid #2a9d4e;position:relative;z-index:1}
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
  
  <div class="golden-frame">
    <div class="islamic-corner corner-tl">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
    <div class="islamic-corner corner-tr">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
    <div class="islamic-corner corner-bl">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
    <div class="islamic-corner corner-br">
      <svg viewBox="0 0 100 100"><path d="M10,10 L10,50 Q10,10 50,10 L90,10 Q50,10 50,50 Q50,10 10,10 Z M25,25 L25,45 Q25,25 45,25 L75,25 Q45,25 45,45 Q45,25 25,25 Z"/></svg>
    </div>
  </div>
  
  <div class="top-border"></div>
  
  <div class="header">
    <div class="header-content">
      <div class="brand-row">
        <div class="ksij-logo">
          <img src="ksij-logo.png" alt="KSIJ Kampala">
        </div>
        <div class="title-block">
          <h1 class="org-name" contenteditable="true">Khoja Shia Ithnasheri Jamat</h1>
          <div class="location" contenteditable="true">KAMPALA · UGANDA</div>
        </div>
      </div>
      <div class="weekly-wrap">
        <div class="golden-lines">
          <div class="golden-line"></div>
          <svg class="golden-star" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg>
          <div class="golden-line"></div>
        </div>
        <div class="weekly-programme-title">
          <span class="word-weekly" contenteditable="true">Weekly</span>
          <span class="word-programme" contenteditable="true">Programme</span>
        </div>
        <svg class="flourish" viewBox="0 0 150 20"><path d="M0,10 Q25,5 50,10 T100,10 Q125,5 150,10 M50,10 Q60,15 75,10 T100,10"/></svg>
        <div class="golden-lines" style="bottom:0;top:auto">
          <div class="golden-line"></div>
          <svg class="golden-star" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/></svg>
          <div class="golden-line"></div>
        </div>
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
      <svg class="crescent-icon crescent-left" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69A6.995 6.995 0 0 0 14 12c0 3.31 2.29 6.09 5.36 6.85A7.962 7.962 0 0 1 12 20z"/></svg>
      <p contenteditable="true">22ND DEC - 28TH DEC 2025</p>
      <p contenteditable="true">1ST - 7TH RAJAB 1447</p>
      <svg class="crescent-icon crescent-right" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c1.85 0 3.55.63 4.9 1.69A6.995 6.995 0 0 0 14 12c0 3.31 2.29 6.09 5.36 6.85A7.962 7.962 0 0 1 12 20z"/></svg>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:39 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:49 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:06 P.M.</td></tr>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:41 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Juma Adhan</span></td><td class="pt" contenteditable="true">12:51 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:08 P.M.</td></tr>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:42 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:52 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:09 P.M.</td></tr>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:40 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:49 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:07 P.M.</td></tr>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:41 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:50 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:08 P.M.</td></tr>
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
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Fajr Adhan</span></td><td class="pt" contenteditable="true">05:42 A.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Zohrain Adhan</span></td><td class="pt" contenteditable="true">12:51 P.M.</td></tr>
              <tr><td class="pl"><span class="prayer-icon" contenteditable="true">🕌</span><span contenteditable="true">Maghrebain Prayers</span></td><td class="pt" contenteditable="true">07:09 P.M.</td></tr>
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
          <img src="qr-code.png" alt="QR Code">
        </div>
      </div>
    </div>
  </div>
  
  <div class="bottom-border"></div>
</div>
`;
