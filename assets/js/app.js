/* MathQuest Kelas VIII — JS bersama. Semua jalan tanpa internet/server.
   Progres tersimpan di perangkat murid (localStorage), bukan di server. */
(function(){
  var KEY='mathquest_kelas8_v1';
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ return {}; } }
  function saveAll(d){ localStorage.setItem(KEY, JSON.stringify(d)); }
  function fmt(n){ return (Math.round(n*100)/100).toString().replace('.', ','); }

  // ---------- Kuis ----------
  document.querySelectorAll('.quiz').forEach(function(quiz){
    var qs=quiz.querySelectorAll('.q'), scoreOut=quiz.querySelector('.score-out');
    var done=0, score=0;
    qs.forEach(function(q){
      var fb=q.querySelector('.fb');
      q.querySelectorAll('.opt').forEach(function(btn){
        btn.addEventListener('click', function(){
          if(q.dataset.answered) return;
          q.dataset.answered='1'; done++;
          var ok=btn.dataset.ok==='1';
          if(ok){ score++; btn.classList.add('correct'); }
          else{
            btn.classList.add('wrong');
            q.querySelectorAll('.opt').forEach(function(o){ if(o.dataset.ok==='1') o.classList.add('correct'); });
          }
          if(fb) fb.hidden=false;
          q.querySelectorAll('.opt').forEach(function(o){ o.disabled=true; });
          if(scoreOut){
            scoreOut.textContent='Skor sementara: '+score+' dari '+qs.length+' soal ('+done+' terjawab).';
            if(done===qs.length){
              var badge = score===qs.length ? '🏆 Lencana Sempurna!' : score>=3 ? '⭐ Lencana Bintang!' : '💪 Terus berlatih, kamu sudah berusaha!';
              scoreOut.textContent='Skor akhir: '+score+' dari '+qs.length+' soal. '+badge+' Sekarang isi nama di kartu Kirim Hasil, lalu tekan Simpan & Buat Ringkasan.';
              quiz.dataset.score=score; quiz.dataset.total=qs.length;
            }
          }
        });
      });
    });
  });

  // ---------- Simpan progres + ringkasan hasil ----------
  var saveBtn=document.getElementById('simpanHasil');
  if(saveBtn){
    saveBtn.addEventListener('click', function(){
      var quiz=document.querySelector('.quiz');
      var score=quiz && quiz.dataset.score ? parseInt(quiz.dataset.score,10) : null;
      var total=quiz && quiz.dataset.total ? parseInt(quiz.dataset.total,10) : 5;
      if(score===null){ alert('Kerjakan kuis sampai selesai dulu, ya. Skor baru bisa disimpan setelah 5 soal terjawab.'); return; }
      var nama=(document.getElementById('namaMurid')||{}).value||'';
      var kelas=(document.getElementById('kelasMurid')||{}).value||'VIII';
      if(!nama.trim()){ alert('Tulis namamu dulu di kolom Nama Murid.'); return; }
      var tp=document.body.dataset.tp||'';
      var judul=document.body.dataset.judul||'';
      var d=load();
      d[tp]={judul:judul, skor:score, total:total, nama:nama.trim(), kelas:kelas.trim(), tanggal:new Date().toLocaleString('id-ID')};
      saveAll(d);
      var ring='Hasil MPI Matematika Kelas VIII\nMateri: '+judul+' ('+tp+')\nNama: '+nama.trim()+' | Kelas: '+kelas.trim()+'\nSkor kuis: '+score+' dari '+total+'\nSekolah: SMP Negeri 1 Anak Ratu Aji\nGuru: Resti Yelma Sari, S.Pd.\nTanggal: '+d[tp].tanggal+'\n\nDikirim dari MathQuest Kelas VIII (GitHub Pages).';
      var out=document.getElementById('hasilOut');
      if(out) out.textContent=ring;
      var box=document.getElementById('hasilBox');
      if(box) box.hidden=false;
      document.querySelectorAll('[data-share]').forEach(function(b){
        b.onclick=function(){
          var mode=b.dataset.share;
          if(mode==='salin'){ navigator.clipboard.writeText(ring).then(function(){ alert('Ringkasan disalin. Tempel di chat gurumu.'); }); }
          if(mode==='unduh'){ var blob=new Blob([ring],{type:'text/plain'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='Hasil-'+tp+'.txt'; a.click(); }
          if(mode==='wa'){ window.open('https://wa.me/?text='+encodeURIComponent(ring),'_blank'); }
          if(mode==='cetak'){ window.print(); }
        };
      });
    });
  }

  // ---------- Peta Misi: centang pos ----------
  var checks=document.querySelectorAll('.mission-check');
  function updateMission(){
    var total=checks.length; if(!total) return;
    var done=0; checks.forEach(function(c){ if(c.checked) done++; });
    var bar=document.getElementById('missionBar'); if(bar) bar.style.width=(done/total*100)+'%';
    var txt=document.getElementById('missionText'); if(txt) txt.textContent=done+' dari '+total+' pos misi selesai.';
    checks.forEach(function(c){
      var pos=document.querySelector('[data-pos="'+c.dataset.pos+'"]');
      if(pos) pos.classList.toggle('done', c.checked);
    });
  }
  checks.forEach(function(c){ c.addEventListener('change', updateMission); });
  updateMission();

  // ---------- Progres di indeks / halaman progres ----------
  var all=load();
  document.querySelectorAll('[data-progress-for]').forEach(function(el){
    var rec=all[el.dataset.progressFor];
    el.textContent = rec ? ('✓ Skor '+rec.skor+'/'+rec.total+' • '+rec.nama) : 'Belum dikerjakan';
  });
  var list=document.getElementById('progressList');
  if(list){
    var codes=Object.keys(all);
    if(!codes.length){ list.innerHTML='<p>Belum ada progres tersimpan di perangkat ini. Kerjakan satu materi, lalu simpan hasilnya.</p>'; }
    else{
      list.innerHTML=codes.map(function(k){ var r=all[k]; return '<tr><td><strong>'+k+'</strong><br>'+r.judul+'</td><td>'+r.nama+' ('+r.kelas+')</td><td>'+r.skor+'/'+r.total+'</td><td>'+r.tanggal+'</td></tr>'; }).join('');
      var totalSkor=codes.reduce(function(s,k){ return s+all[k].skor; },0);
      var totalSoal=codes.reduce(function(s,k){ return s+all[k].total; },0);
      var sum=document.getElementById('progressSummary');
      if(sum) sum.textContent='Kamu sudah menyelesaikan '+codes.length+' materi, total skor '+totalSkor+' dari '+totalSoal+' soal.';
    }
    var reset=document.getElementById('hapusProgres');
    if(reset) reset.addEventListener('click', function(){ if(confirm('Hapus semua progres di perangkat ini?')){ localStorage.removeItem(KEY); location.reload(); } });
  }

  // ---------- Lab: Bilangan Berpangkat ----------
  var b1=document.getElementById('pangkatBasis');
  if(b1){
    var hitung=function(){
      var a=parseFloat(b1.value)||0, p=parseInt(document.getElementById('pangkatEks').value,10)||0;
      var h=Math.pow(a,p);
      var exp='';
      if(Number.isInteger(p) && p>=0 && p<=6){ var parts=[]; for(var i=0;i<p;i++) parts.push(a); exp = p===0 ? ' (pangkat 0 selalu 1, asal basisnya bukan 0)' : ' = '+parts.join(' × '); }
      if(p<0) exp=' (pangkat negatif artinya 1 dibagi pangkat positifnya)';
      document.getElementById('pangkatOut').textContent=a+'^'+p+' = '+fmt(h)+exp;
    };
    b1.addEventListener('input', hitung); document.getElementById('pangkatEks').addEventListener('input', hitung); hitung();
  }
  // ---------- Lab: Bentuk Akar ----------
  var aIn=document.getElementById('akarInput');
  if(aIn){
    var hitungAkar=function(){
      var n=parseInt(aIn.value,10);
      if(!n || n<0){ document.getElementById('akarOut').textContent='Masukkan bilangan cacah, misalnya 72.'; return; }
      var best=1, sisa=n;
      for(var a=1;a*a<=n;a++){ if(n%(a*a)===0){ best=a; sisa=n/(a*a); } }
      var teks = sisa===1 ? '√'+n+' = '+best : '√'+n+' = '+best+'√'+sisa;
      document.getElementById('akarOut').textContent=teks+'  (cek: '+fmt(Math.sqrt(n))+')';
    };
    aIn.addEventListener('input', hitungAkar); hitungAkar();
  }
  // ---------- Lab: Bentuk Baku ----------
  var bk=document.getElementById('bakuInput');
  if(bk){
    var hitungBaku=function(){
      var v=parseFloat((bk.value||'').replace(',','.'));
      if(!v){ document.getElementById('bakuOut').textContent='Masukkan angka, misalnya 35000 atau 0,00042.'; return; }
      document.getElementById('bakuOut').textContent=v+' = '+v.toExponential(2).replace('e',' × 10^');
    };
    bk.addEventListener('input', hitungBaku); hitungBaku();
  }
  // ---------- Lab: Pythagoras ----------
  var pyA=document.getElementById('pyA');
  if(pyA){
    var hitungPy=function(){
      var a=parseFloat(pyA.value)||0, b=parseFloat(document.getElementById('pyB').value)||0;
      var c=Math.sqrt(a*a+b*b);
      var trip = Number.isInteger(c) && Number.isInteger(a) && Number.isInteger(b) ? ' Ini tripel Pythagoras!' : '';
      var khusus = (a===b && a>0) ? ' Segitiga siku-siku sama kaki: sisi miring = '+fmt(a)+'√2.' : '';
      document.getElementById('pyOut').textContent='c = √('+a+'² + '+b+'²) = '+fmt(c)+'.'+trip+khusus;
    };
    pyA.addEventListener('input', hitungPy); document.getElementById('pyB').addEventListener('input', hitungPy); hitungPy();
  }
  // ---------- Lab: PLSV ----------
  var plA=document.getElementById('plsvA');
  if(plA){
    var hitungPlsv=function(){
      var a=parseFloat(plA.value)||0, b=parseFloat(document.getElementById('plsvB').value)||0, c=parseFloat(document.getElementById('plsvC').value)||0;
      if(a===0){ document.getElementById('plsvOut').textContent='Nilai a tidak boleh 0.'; return; }
      var x=(c-b)/a;
      document.getElementById('plsvOut').textContent=a+'x + '+b+' = '+c+'  →  '+a+'x = '+(c-b)+'  →  x = '+fmt(x);
    };
    ['plsvA','plsvB','plsvC'].forEach(function(id){ document.getElementById(id).addEventListener('input', hitungPlsv); }); hitungPlsv();
  }
  // ---------- Lab: PtLSV ----------
  var ptA=document.getElementById('ptlsvA');
  if(ptA){
    var hitungPt=function(){
      var a=parseFloat(ptA.value)||0, b=parseFloat(document.getElementById('ptlsvB').value)||0, c=parseFloat(document.getElementById('ptlsvC').value)||0;
      var op=document.getElementById('ptlsvOp').value;
      if(a===0){ document.getElementById('ptlsvOut').textContent='Nilai a tidak boleh 0.'; return; }
      var bound=(c-b)/a, flip=a<0;
      var ops={'<':'<','<=':'≤','>':'>','>=':'≥'};
      var flipMap={'<':'>','<=':'≥','>':'<','>=':'≤'};
      var finalOp=flip?flipMap[op]:op;
      document.getElementById('ptlsvOut').textContent='Dari '+a+'x + '+b+' '+ops[op]+' '+c+', diperoleh x '+ops[finalOp]+' '+fmt(bound)+ (flip?' (tanda dibalik karena dibagi bilangan negatif).':'');
    };
    ['ptlsvA','ptlsvB','ptlsvC','ptlsvOp'].forEach(function(id){ document.getElementById(id).addEventListener('input', hitungPt); document.getElementById(id).addEventListener('change', hitungPt); }); hitungPt();
  }
  // ---------- Lab: Pola Bilangan ----------
  var poT=document.getElementById('polaJenis');
  if(poT){
    var hitungPola=function(){
      var jenis=poT.value, a1=parseFloat(document.getElementById('polaA1').value)||0, d=parseFloat(document.getElementById('polaD').value)||0, n=parseInt(document.getElementById('polaN').value,10)||1;
      var list=[], un=0;
      for(var i=1;i<=Math.min(n,12);i++){
        if(jenis==='arit') list.push(a1+(i-1)*d);
        if(jenis==='geo') list.push(a1*Math.pow(d,i-1));
        if(jenis==='kuadrat') list.push(i*i);
      }
      if(jenis==='arit') un=a1+(n-1)*d;
      if(jenis==='geo') un=a1*Math.pow(d,n-1);
      if(jenis==='kuadrat') un=n*n;
      document.getElementById('polaOut').textContent='Suku ke-'+n+' = '+fmt(un)+'. Barisan awal: '+list.map(fmt).join(', ');
    };
    ['polaJenis','polaA1','polaD','polaN'].forEach(function(id){ var el=document.getElementById(id); el.addEventListener('input', hitungPola); el.addEventListener('change', hitungPola); }); hitungPola();
  }
  // ---------- Lab: Fungsi ----------
  var fA=document.getElementById('fungsiA');
  if(fA){
    var hitungF=function(){
      var a=parseFloat(fA.value)||0, b=parseFloat(document.getElementById('fungsiB').value)||0, x=parseFloat(document.getElementById('fungsiX').value)||0;
      var rows=[-2,-1,0,1,2].map(function(v){ return 'f('+v+') = '+fmt(a*v+b); }).join(' • ');
      document.getElementById('fungsiOut').textContent='f(x) = '+a+'x + '+b+' → f('+x+') = '+fmt(a*x+b)+'. Tabel: '+rows;
    };
    ['fungsiA','fungsiB','fungsiX'].forEach(function(id){ document.getElementById(id).addEventListener('input', hitungF); }); hitungF();
  }
  // ---------- Lab: Garis Lurus (canvas responsif + tajam di TV) ----------
  // Canvas menyesuaikan lebar layar: kecil di HP, besar dan tajam (DPR)
  // di laptop/TV, dan digambar ulang saat layar diputar/diubah ukurannya.
  var gM=document.getElementById('garisM');
  if(gM){
    var canvas=document.getElementById('garisCanvas'), ctx=canvas.getContext('2d');
    var gambar=function(){
      var m=parseFloat(gM.value), c=parseFloat(document.getElementById('garisC').value);
      document.getElementById('garisOut').textContent='y = '+m+'x + '+c+' • Gradien = '+m+' • Memotong sumbu y di (0, '+c+')';
      var dispW=Math.max(280, canvas.clientWidth || 560);
      var dispH=Math.round(dispW*9/16);
      var dpr=Math.min(window.devicePixelRatio||1, 2);
      if(canvas.width!==Math.round(dispW*dpr) || canvas.height!==Math.round(dispH*dpr)){
        canvas.width=Math.round(dispW*dpr); canvas.height=Math.round(dispH*dpr);
      }
      ctx.setTransform(dpr,0,0,dpr,0,0);
      var W=dispW, H=dispH, S=(W>=900?28:20), ox=W/2, oy=H/2;
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='#dbe1f0'; ctx.lineWidth=1;
      for(var x=0;x<=W;x+=S){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for(var y=0;y<=H;y+=S){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
      ctx.strokeStyle='#172033'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(W,oy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,H); ctx.stroke();
      ctx.strokeStyle='#ff5ca8'; ctx.lineWidth=(W>=900?4:3); ctx.beginPath();
      for(var px=0;px<=W;px++){ var xv=(px-ox)/S, yv=m*xv+c, py=oy-yv*S; if(px===0) ctx.moveTo(px,py); else ctx.lineTo(px,py); }
      ctx.stroke();
    };
    gM.addEventListener('input', gambar); document.getElementById('garisC').addEventListener('input', gambar);
    var resizeTimer=null;
    window.addEventListener('resize', function(){ clearTimeout(resizeTimer); resizeTimer=setTimeout(gambar, 120); });
    // Gambar setelah CSS selesai dihitung, supaya clientWidth sudah benar.
    requestAnimationFrame(gambar); setTimeout(gambar, 50);
  }
  // ---------- Lab: Sampel ----------
  var smBtn=document.getElementById('sampelBtn');
  if(smBtn){
    smBtn.addEventListener('click', function(){
      var pop=[]; for(var i=1;i<=30;i++) pop.push('Siswa '+String(i).padStart(2,'0'));
      var out=[];
      while(out.length<5){ var p=pop[Math.floor(Math.random()*pop.length)]; if(out.indexOf(p)===-1) out.push(p); }
      document.getElementById('sampelOut').textContent='Sampel acak 5 dari 30 siswa: '+out.join(', ')+'. Coba tekan lagi — sampelnya berubah, tapi tetap mewakili jika caranya acak.';
    });
  }
  // ---------- Lab: Statistika ----------
  var stIn=document.getElementById('statInput');
  if(stIn){
    var hitungStat=function(){
      var nums=(stIn.value||'').split(/[,\s]+/).filter(Boolean).map(function(v){ return parseFloat(v.replace(',','.')); }).filter(function(v){ return !isNaN(v); });
      if(nums.length<2){ document.getElementById('statOut').textContent='Tulis minimal 2 angka, pisahkan dengan koma. Contoh: 6, 7, 8, 7, 9'; document.getElementById('statChart').innerHTML=''; return; }
      var sorted=nums.slice().sort(function(a,b){ return a-b; });
      var mean=nums.reduce(function(s,v){ return s+v; },0)/nums.length;
      var med=sorted.length%2 ? sorted[Math.floor(sorted.length/2)] : (sorted[sorted.length/2-1]+sorted[sorted.length/2])/2;
      var freq={}; nums.forEach(function(v){ freq[v]=(freq[v]||0)+1; });
      var maxF=Math.max.apply(null, Object.values(freq));
      var modus=Object.keys(freq).filter(function(k){ return freq[k]===maxF; }).join(', ');
      var range=sorted[sorted.length-1]-sorted[0];
      document.getElementById('statOut').textContent='Mean = '+fmt(mean)+' • Median = '+fmt(med)+' • Modus = '+modus+' • Jangkauan = '+fmt(range)+' • Data terurut: '+sorted.map(fmt).join(', ');
      var mx=Math.max.apply(null, sorted);
      document.getElementById('statChart').innerHTML=sorted.map(function(v){ return '<div style="height:'+(v/mx*130+10)+'px">'+fmt(v)+'</div>'; }).join('');
    };
    stIn.addEventListener('input', hitungStat); hitungStat();
  }
})();
