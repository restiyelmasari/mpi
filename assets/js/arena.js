/* Arena Interaktif Baru untuk Kelas 8 (kecuali B.5 yang sudah di app.js).
   Setiap handler hanya jalan bila elemennya ada di halaman yang dibuka. */
(function(){
  function fmt(n){ return (Math.round(n*100)/100).toString().replace('.', ','); }
  function byId(id){ return document.getElementById(id); }
  function gameState(){
    var s={skor:0};
    return s;
  }
  // ---------- B.6: Persegi dan akar ----------
  var akarLuas=byId('akarLuas');
  if(akarLuas){
    var renderAkar=function(){
      var luas=parseFloat(akarLuas.value), sisi=Math.sqrt(luas);
      var box=byId('akarPersegi');
      var px=Math.max(60, Math.min(220, sisi*12));
      box.style.width=px+'px'; box.style.height=px+'px';
      box.textContent='Luas '+luas;
      byId('akarVisualOut').textContent='Sisi = √'+luas+' = '+fmt(sisi)+' satuan. Cek: '+fmt(sisi)+' × '+fmt(sisi)+' = '+fmt(sisi*sisi)+'.';
    };
    akarLuas.addEventListener('input', renderAkar); renderAkar();
  }
  // B.6: Game sederhanakan akar
  var akarBaru=byId('gameAkarBaru');
  if(akarBaru){
    var skorA=0, jawabA=0, jawabB=0;
    var soalAkar=function(){
      var pilihan=[[12,2,3],[18,3,2],[20,2,5],[27,3,3],[32,4,2],[45,3,5],[48,4,3],[50,5,2],[72,6,2],[75,5,3],[80,4,5],[98,7,2]];
      var p=pilihan[Math.floor(Math.random()*pilihan.length)];
      var n=p[0]*p[0]; // tidak dipakai, kita pakai bentuk asli di bawah
      // Simpan soal sebagai n = a^2 * b
      var a=p[1], b=p[2], nn=a*a*b;
      jawabA=a; jawabB=b;
      byId('gameAkarSoal').textContent='Sederhanakan √'+nn+' menjadi a√b. Berapa a dan b?';
      byId('gameAkarA').value=''; byId('gameAkarB').value='';
      byId('gameAkarOut').textContent='Tulis a dan b, lalu tekan Cek Jawaban.';
    };
    byId('gameAkarCek').addEventListener('click', function(){
      var a=parseInt(byId('gameAkarA').value,10), b=parseInt(byId('gameAkarB').value,10);
      if(isNaN(a)||isNaN(b)){ byId('gameAkarOut').textContent='Tulis dulu a dan b, ya.'; return; }
      if(a===jawabA && b===jawabB){ skorA++; byId('gameAkarOut').textContent='🎉 Benar! Jawabannya '+jawabA+'√'+jawabB+'.'; }
      else{ byId('gameAkarOut').textContent='Belum tepat. Jawaban yang benar adalah '+jawabA+'√'+jawabB+'.'; }
      byId('gameAkarSkor').textContent='Skor: '+skorA;
    });
    akarBaru.addEventListener('click', soalAkar); soalAkar();
  }
  // B.6: Gabung akar sejenis
  var gabA=byId('akarGabA');
  if(gabA){
    var renderGab=function(){
      var a=parseInt(gabA.value,10), b=parseInt(byId('akarGabB').value,10);
      byId('akarGabOut').textContent=a+'√3 + '+b+'√3 = '+(a+b)+'√3. Koefisiennya dijumlah karena bentuk akarnya sejenis.';
    };
    gabA.addEventListener('input', renderGab); byId('akarGabB').addEventListener('input', renderGab); renderGab();
  }
  // ---------- B.7: Skala bentuk baku ----------
  var mant=byId('bakuMantissa');
  if(mant){
    var contoh=function(e){
      if(e<=-3) return 'Contoh ukuran: virus / debu sangat kecil.';
      if(e<=0) return 'Contoh ukuran: benda kecil sehari-hari (mm sampai cm).';
      if(e<=3) return 'Contoh ukuran: manusia sampai gedung (meter sampai kilometer).';
      if(e<=6) return 'Contoh ukuran: kota sampai pulau.';
      return 'Contoh ukuran: planet sampai jarak antarbintang.';
    };
    var renderSkala=function(){
      var a=parseFloat(mant.value), e=parseInt(byId('bakuEks').value,10);
      byId('bakuSkalaOut').textContent=a+' × 10^'+e+' = '+a+' × 10 pangkat '+e+'. '+contoh(e);
    };
    mant.addEventListener('input', renderSkala); byId('bakuEks').addEventListener('input', renderSkala); renderSkala();
  }
  // B.7: Game ubah ke bentuk baku
  var bakuBaru=byId('bakuGameBaru');
  if(bakuBaru){
    var skorBk=0, jMant=0, jEks=0;
    var soalBaku=function(){
      var pilihan=[[45000,4.5,4],[720000,7.2,5],[0.0032,3.2,-3],[0.00056,5.6,-4],[125000,1.25,5],[0.0085,8.5,-3],[93000,9.3,4],[0.000042,4.2,-5]];
      var p=pilihan[Math.floor(Math.random()*pilihan.length)];
      jMant=p[1]; jEks=p[2];
      byId('bakuGameSoal').textContent='Ubah '+p[0]+' ke bentuk baku a × 10^n. Berapa a dan n?';
      byId('bakuGameMantissa').value=''; byId('bakuGameEks').value='';
      byId('bakuGameOut').textContent='Tulis a dan n, lalu tekan Cek Jawaban.';
    };
    byId('bakuGameCek').addEventListener('click', function(){
      var a=parseFloat((byId('bakuGameMantissa').value||'').replace(',','.')), e=parseInt(byId('bakuGameEks').value,10);
      if(isNaN(a)||isNaN(e)){ byId('bakuGameOut').textContent='Tulis dulu a dan n, ya.'; return; }
      if(Math.abs(a-jMant)<0.01 && e===jEks){ skorBk++; byId('bakuGameOut').textContent='🎉 Benar! Jawabannya '+jMant+' × 10^'+jEks+'.'; }
      else{ byId('bakuGameOut').textContent='Belum tepat. Jawaban yang benar adalah '+jMant+' × 10^'+jEks+'.'; }
      byId('bakuGameSkor').textContent='Skor: '+skorBk;
    });
    bakuBaru.addEventListener('click', soalBaku); soalBaku();
  }
  // B.7: Bandingkan
  var bandBtn=byId('bandCek');
  if(bandBtn){
    bandBtn.addEventListener('click', function(){
      var a1=parseFloat(byId('bandA').value)||0, e1=parseInt(byId('bandE1').value,10)||0;
      var a2=parseFloat(byId('bandB').value)||0, e2=parseInt(byId('bandE2').value,10)||0;
      var v1=a1*Math.pow(10,e1), v2=a2*Math.pow(10,e2);
      var hasil = v1>v2 ? 'Bilangan 1 lebih besar.' : v2>v1 ? 'Bilangan 2 lebih besar.' : 'Kedua bilangan sama besar.';
      byId('bandOut').textContent=hasil+' Nilai 1 = '+v1.toLocaleString('id-ID')+', nilai 2 = '+v2.toLocaleString('id-ID')+'.';
    });
  }
  // ---------- G.4: Segitiga visual ----------
  var pythA=byId('pythA');
  if(pythA){
    var canvas=byId('pythCanvas'), ctx=canvas.getContext('2d');
    var gambarPyth=function(){
      var a=parseFloat(pythA.value), b=parseFloat(byId('pythB').value), c=Math.sqrt(a*a+b*b);
      var dispW=Math.max(280, canvas.clientWidth||560), dispH=Math.round(dispW*300/560), dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(dispW*dpr); canvas.height=Math.round(dispH*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,dispW,dispH);
      var S=dispW/18, ox=40, oy=dispH-40;
      ctx.fillStyle='#7c5cff'; ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox,oy-b*S); ctx.lineTo(ox+a*S,oy); ctx.closePath(); ctx.fill();
      ctx.fillStyle='#172033'; ctx.font='bold 14px system-ui, sans-serif';
      ctx.fillText('a = '+a, ox-30, oy-b*S/2);
      ctx.fillText('b = '+b, ox+a*S/2, oy+20);
      ctx.fillText('c = '+fmt(c), ox+a*S/2, oy-b*S/2-10);
      byId('pythVisualOut').textContent='a² + b² = '+a+'² + '+b+'² = '+(a*a)+' + '+(b*b)+' = '+(a*a+b*b)+'. Jadi c = √'+(a*a+b*b)+' = '+fmt(c)+'. Luas persegi di sisi miring = '+fmt(c*c)+'.';
    };
    pythA.addEventListener('input', gambarPyth); byId('pythB').addEventListener('input', gambarPyth);
    requestAnimationFrame(gambarPyth); setTimeout(gambarPyth,50);
  }
  // G.4: Game tripel
  var tripelBaru=byId('tripelBaru');
  if(tripelBaru){
    var skorT=0, isTripel=false;
    var soalTripel=function(){
      var pilihan=[[3,4,5,true],[5,12,13,true],[6,8,10,true],[8,15,17,true],[4,5,6,false],[5,6,7,false],[7,8,9,false],[9,12,14,false]];
      var p=pilihan[Math.floor(Math.random()*pilihan.length)];
      isTripel=p[3];
      byId('tripelSoal').textContent='Apakah '+p[0]+', '+p[1]+', '+p[2]+' tripel Pythagoras?';
      byId('tripelOut').textContent='Cek dengan a² + b², lalu bandingkan dengan c².';
      tripelBaru.dataset.a=p[0]; tripelBaru.dataset.b=p[1]; tripelBaru.dataset.c=p[2];
    };
    var cekTripel=function(jawab){
      var a=parseInt(tripelBaru.dataset.a,10), b=parseInt(tripelBaru.dataset.b,10), c=parseInt(tripelBaru.dataset.c,10);
      var benar = jawab===isTripel;
      if(benar){ skorT++; byId('tripelOut').textContent='🎉 Benar! '+a+'² + '+b+'² = '+(a*a+b*b)+', c² = '+(c*c)+'.'; }
      else{ byId('tripelOut').textContent='Belum tepat. '+a+'² + '+b+'² = '+(a*a+b*b)+', sedangkan c² = '+(c*c)+'.'; }
      byId('tripelSkor').textContent='Skor: '+skorT;
    };
    byId('tripelYa').addEventListener('click', function(){ cekTripel(true); });
    byId('tripelTidak').addEventListener('click', function(){ cekTripel(false); });
    tripelBaru.addEventListener('click', soalTripel); soalTripel();
  }
  // G.4: Jarak dua titik
  var jarakBtn=byId('jarakHitung');
  if(jarakBtn){
    jarakBtn.addEventListener('click', function(){
      var x1=parseFloat(byId('jarakX1').value)||0, y1=parseFloat(byId('jarakY1').value)||0;
      var x2=parseFloat(byId('jarakX2').value)||0, y2=parseFloat(byId('jarakY2').value)||0;
      var d=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
      byId('jarakOut').textContent='Jarak = √[('+x2+'-'+x1+')² + ('+y2+'-'+y1+')²] = √'+fmt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))+' = '+fmt(d)+' satuan.';
      var canvas=byId('jarakCanvas'), ctx=canvas.getContext('2d');
      var dispW=Math.max(280, canvas.clientWidth||560), dispH=Math.round(dispW*300/560), dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(dispW*dpr); canvas.height=Math.round(dispH*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,dispW,dispH);
      var S=24, ox=dispW/2, oy=dispH/2;
      ctx.strokeStyle='#dbe1f0'; ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(dispW,oy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,dispH); ctx.stroke();
      var px1=ox+x1*S, py1=oy-y1*S, px2=ox+x2*S, py2=oy-y2*S;
      ctx.strokeStyle='#ff5ca8'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(px1,py1); ctx.lineTo(px2,py2); ctx.stroke();
      ctx.fillStyle='#172033'; ctx.beginPath(); ctx.arc(px1,py1,6,0,7); ctx.fill(); ctx.beginPath(); ctx.arc(px2,py2,6,0,7); ctx.fill();
    });
  }
})();

// Tambahan arena.js bagian 2: A2, A3, A4 (dijalankan setelah bagian 1, dalam IIFE terpisah agar aman)
(function(){
  function fmt(n){ return (Math.round(n*100)/100).toString().replace('.', ','); }
  function byId(id){ return document.getElementById(id); }
  // A.2 Timbangan
  var timX=byId('timbangX');
  if(timX){
    var renderTimbang=function(){
      var x=parseInt(timX.value,10), kiri=2*x+5, kanan=17;
      var status = kiri===kanan ? '⚖️ SEIMBANG! x = '+x+' adalah jawabannya.' : kiri<kanan ? 'Kiri ('+kiri+') lebih ringan dari kanan ('+kanan+'). Naikkan x.' : 'Kiri ('+kiri+') lebih berat dari kanan ('+kanan+'). Turunkan x.';
      byId('timbangOut').textContent='x = '+x+' → kiri: 2×'+x+' + 5 = '+kiri+', kanan: 17. '+status;
    };
    timX.addEventListener('input', renderTimbang); renderTimbang();
  }
  // A.2 Game PLSV
  var plsvBaru=byId('plsvGameBaru');
  if(plsvBaru){
    var skor=0, jawab=0;
    var soalPlsv=function(){
      var a=2+Math.floor(Math.random()*4), b=1+Math.floor(Math.random()*9), x=2+Math.floor(Math.random()*8), c=a*x+b;
      jawab=x;
      byId('plsvGameSoal').textContent='Selesaikan: '+a+'x + '+b+' = '+c+'. Berapa x?';
      byId('plsvGameJawab').value=''; byId('plsvGameOut').textContent='Tulis x, lalu tekan Cek Jawaban.';
    };
    byId('plsvGameCek').addEventListener('click', function(){
      var v=parseInt(byId('plsvGameJawab').value,10);
      if(isNaN(v)){ byId('plsvGameOut').textContent='Tulis dulu x, ya.'; return; }
      if(v===jawab){ skor++; byId('plsvGameOut').textContent='🎉 Benar! x = '+jawab+'.'; } else { byId('plsvGameOut').textContent='Belum tepat. Jawaban yang benar adalah x = '+jawab+'.'; }
      byId('plsvGameSkor').textContent='Skor: '+skor;
    });
    plsvBaru.addEventListener('click', soalPlsv); soalPlsv();
  }
  // A.2 Cerita
  var ceritaBaru=byId('ceritaBaru');
  if(ceritaBaru){
    var jawabC=0;
    var soalCerita=function(){
      var b=3+Math.floor(Math.random()*8), x=4+Math.floor(Math.random()*9), total=x+b;
      jawabC=x;
      byId('ceritaSoal').textContent='Sebuah kotak berisi x pensil, ditambah '+b+' pensil satuan, totalnya '+total+' pensil. Berapa isi kotak itu (x)?';
      byId('ceritaJawab').value=''; byId('ceritaOut').textContent='Modelnya: x + '+b+' = '+total+'.';
    };
    byId('ceritaCek').addEventListener('click', function(){
      var v=parseInt(byId('ceritaJawab').value,10);
      if(isNaN(v)){ byId('ceritaOut').textContent='Tulis dulu x, ya.'; return; }
      byId('ceritaOut').textContent = v===jawabC ? '🎉 Benar! Isi kotaknya '+jawabC+' pensil.' : 'Belum tepat. Jawaban yang benar adalah '+jawabC+'.';
    });
    ceritaBaru.addEventListener('click', soalCerita); soalCerita();
  }
  // A.3 Garis bilangan
  var ptBil=byId('ptBilangan');
  if(ptBil){
    var renderPt=function(){
      var batas=parseInt(ptBil.value,10), tanda=byId('ptTanda').value;
      var tandaTxt={'<':'<','<=':'≤','>':'>','>=':'≥'}[tanda];
      byId('ptBilanganOut').textContent='Himpunan penyelesaian: x '+tandaTxt+' '+batas+'.';
      var canvas=byId('ptCanvas'), ctx=canvas.getContext('2d');
      var dispW=Math.max(280, canvas.clientWidth||560), dispH=160, dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(dispW*dpr); canvas.height=Math.round(dispH*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,dispW,dispH);
      var S=(dispW-80)/20, ox=40;
      ctx.strokeStyle='#172033'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(20,dispH/2); ctx.lineTo(dispW-20,dispH/2); ctx.stroke();
      ctx.fillStyle='#172033'; ctx.font='bold 12px system-ui, sans-serif'; ctx.textAlign='center';
      for(var v=-10; v<=10; v++){ var px=ox+(v+10)*S; ctx.fillText(v, px, dispH/2+28); }
      var bx=ox+(batas+10)*S;
      var keKanan = tanda==='>' || tanda==='>=';
      ctx.strokeStyle='#ff5ca8'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(keKanan?bx:dispW-20, dispH/2); ctx.lineTo(keKanan?dispW-20:20, dispH/2); ctx.stroke();
      ctx.fillStyle='#ff5ca8'; ctx.beginPath(); ctx.arc(bx,dispH/2,9,0,7); ctx.fill();
      ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(bx,dispH/2, (tanda==='<'||tanda==='>')?5:0, 0, 7); ctx.fill();
    };
    ptBil.addEventListener('input', renderPt); byId('ptTanda').addEventListener('change', renderPt);
    requestAnimationFrame(renderPt); setTimeout(renderPt,50);
  }
  // A.3 Game PtLSV
  var ptBaru=byId('ptGameBaru');
  if(ptBaru){
    var skorP=0, jBatas=0, jTanda='>=';
    var soalPt=function(){
      var a=2+Math.floor(Math.random()*3), b=1+Math.floor(Math.random()*6), x=2+Math.floor(Math.random()*6), c=a*x+b, op=['>=','<=','>','<'][Math.floor(Math.random()*4)];
      // Buat soal sederhana: ax + b op c, dengan x bulat yang dipakai sebagai batas, arah sesuai op dan a positif (tidak dibalik)
      jBatas=x; jTanda=op;
      byId('ptGameSoal').textContent='Selesaikan: '+a+'x + '+b+' '+({'<':'<','<=':'≤','>':'>','>=':'≥'}[op])+' '+c+'. Berapa batas dan tandanya?';
      byId('ptGameJawab').value=''; byId('ptGameOut').textContent='Tulis batas dan pilih tanda, lalu tekan Cek Jawaban.';
    };
    byId('ptGameCek').addEventListener('click', function(){
      var v=parseInt(byId('ptGameJawab').value,10), t=byId('ptGameTanda').value;
      if(isNaN(v)){ byId('ptGameOut').textContent='Tulis dulu batasnya, ya.'; return; }
      if(v===jBatas && t===jTanda){ skorP++; byId('ptGameOut').textContent='🎉 Benar! x '+({'<':'<','<=':'≤','>':'>','>=':'≥'}[jTanda])+' '+jBatas+'.'; }
      else{ byId('ptGameOut').textContent='Belum tepat. Jawaban yang benar adalah x '+({'<':'<','<=':'≤','>':'>','>=':'≥'}[jTanda])+' '+jBatas+'.'; }
      byId('ptGameSkor').textContent='Skor: '+skorP;
    });
    ptBaru.addEventListener('click', soalPt); soalPt();
  }
  // A.3 Anggaran
  var angJml=byId('anggaranJumlah');
  if(angJml){
    var renderAng=function(){
      var budget=parseFloat(byId('anggaranBudget').value)||0, harga=parseFloat(byId('anggaranHarga').value)||0, jml=parseInt(angJml.value,10), total=harga*jml, sisa=budget-total;
      byId('anggaranOut').textContent='Total: Rp'+total.toLocaleString('id-ID')+'. Sisa: Rp'+sisa.toLocaleString('id-ID')+'. '+(sisa>=0?'✅ Masih dalam anggaran.':'❌ Melebihi anggaran! Kurangi jumlahnya.')+' Maksimal barang yang boleh dibeli: '+(harga>0?Math.floor(budget/harga):0)+' buah.';
    };
    angJml.addEventListener('input', renderAng); byId('anggaranBudget').addEventListener('input', renderAng); byId('anggaranHarga').addEventListener('input', renderAng); renderAng();
  }
  // A.4 Pola titik
  var polaN=byId('polaVisualN');
  if(polaN){
    var renderPola=function(){
      var jenis=byId('polaVisualJenis').value, n=parseInt(polaN.value,10), count=0, label='';
      if(jenis==='kuadrat'){ count=n*n; label='Bilangan kuadrat ke-'+n+' = '+n+'² = '+count; }
      if(jenis==='segitiga'){ count=n*(n+1)/2; label='Bilangan segitiga ke-'+n+' = '+count; }
      if(jenis==='genap'){ count=2*n; label='Bilangan genap ke-'+n+' = 2 × '+n+' = '+count; }
      var dots = count<=100 ? '🔵'.repeat(count) : '🔵 × '+count;
      byId('polaVisualGrid').textContent=dots;
      byId('polaVisualOut').textContent=label+'.';
    };
    polaN.addEventListener('input', renderPola); byId('polaVisualJenis').addEventListener('change', renderPola); renderPola();
  }
  // A.4 Game suku berikutnya
  var polaBaru=byId('polaGameBaru');
  if(polaBaru){
    var skorPo=0, jawabPo=0;
    var soalPola=function(){
      var jenis=Math.floor(Math.random()*3), a=2+Math.floor(Math.random()*5), d=2+Math.floor(Math.random()*4), terms=[], next=0;
      if(jenis===0){ for(var i=0;i<4;i++) terms.push(a+i*d); next=a+4*d; }
      if(jenis===1){ for(var i=0;i<4;i++) terms.push(a*Math.pow(2,i)); next=a*16; }
      if(jenis===2){ for(var i=1;i<=4;i++) terms.push(i*i); next=25; }
      jawabPo=next;
      byId('polaGameSoal').textContent='Lanjutkan pola: '+terms.join(', ')+', … Berapa suku ke-5?';
      byId('polaGameJawab').value=''; byId('polaGameOut').textContent='Tulis suku ke-5, lalu tekan Cek Jawaban.';
    };
    byId('polaGameCek').addEventListener('click', function(){
      var v=parseInt(byId('polaGameJawab').value,10);
      if(isNaN(v)){ byId('polaGameOut').textContent='Tulis dulu jawabannya, ya.'; return; }
      if(v===jawabPo){ skorPo++; byId('polaGameOut').textContent='🎉 Benar! Suku ke-5 adalah '+jawabPo+'.'; } else { byId('polaGameOut').textContent='Belum tepat. Jawaban yang benar adalah '+jawabPo+'.'; }
      byId('polaGameSkor').textContent='Skor: '+skorPo;
    });
    polaBaru.addEventListener('click', soalPola); soalPola();
  }
  // A.4 Batang barisan
  var barN=byId('barisanN');
  if(barN){
    var renderBarisan=function(){
      var a1=parseFloat(byId('barisanA1').value)||0, d=parseFloat(byId('barisanBeda').value)||0, n=parseInt(barN.value,10), terms=[];
      for(var i=0;i<n;i++) terms.push(a1+i*d);
      var mx=Math.max.apply(null, terms.map(Math.abs).concat([1]));
      byId('barisanChart').innerHTML=terms.map(function(v){ return '<div style="height:'+(Math.abs(v)/mx*130+10)+'px">'+fmt(v)+'</div>'; }).join('');
      byId('barisanOut').textContent='Barisan: '+terms.map(fmt).join(', ')+'. Suku ke-'+n+' = '+fmt(terms[terms.length-1])+'.';
    };
    barN.addEventListener('input', renderBarisan); byId('barisanA1').addEventListener('input', renderBarisan); byId('barisanBeda').addEventListener('input', renderBarisan); renderBarisan();
  }
})();

// Tambahan arena.js bagian 3: A5, A6, D3, D4
(function(){
  function fmt(n){ return (Math.round(n*100)/100).toString().replace('.', ','); }
  function byId(id){ return document.getElementById(id); }
  // A.5 Mesin fungsi visual
  var fvA=byId('fungsiVisualA');
  if(fvA){
    var renderFv=function(){
      var a=parseInt(fvA.value,10), b=parseInt(byId('fungsiVisualB').value,10), x=parseInt(byId('fungsiVisualX').value,10);
      var rows=[-2,-1,0,1,2].map(function(v){ return 'f('+v+') = '+fmt(a*v+b); }).join(' • ');
      byId('fungsiVisualOut').textContent='f(x) = '+a+'x + '+b+' → f('+x+') = '+fmt(a*x+b)+'. Tabel: '+rows;
    };
    fvA.addEventListener('input', renderFv); byId('fungsiVisualB').addEventListener('input', renderFv); byId('fungsiVisualX').addEventListener('input', renderFv); renderFv();
  }
  // A.5 Game fungsi atau bukan
  var fgBaru=byId('fungsiGameBaru');
  if(fgBaru){
    var skorF=0, isFungsi=true;
    var soalFungsi=function(){
      var pilihan=[
        {teks:'(1, 2), (2, 4), (3, 6)', ok:true},
        {teks:'(1, 2), (1, 5), (2, 3)', ok:false},
        {teks:'(2, 5), (3, 5), (4, 5)', ok:true},
        {teks:'(1, 1), (2, 2), (2, 3)', ok:false},
        {teks:'(0, 0), (1, 1), (2, 4)', ok:true}
      ];
      var p=pilihan[Math.floor(Math.random()*pilihan.length)];
      isFungsi=p.ok;
      byId('fungsiGameSoal').textContent='Pasangan: '+p.teks+'. Apakah ini fungsi?';
      byId('fungsiGameOut').textContent='Ingat: satu domain hanya boleh punya satu pasangan.';
    };
    var cekFungsi=function(jawab){
      if(jawab===isFungsi){ skorF++; byId('fungsiGameOut').textContent='🎉 Benar!'; } else { byId('fungsiGameOut').textContent='Belum tepat. Periksa apakah ada domain yang punya dua pasangan.'; }
      byId('fungsiGameSkor').textContent='Skor: '+skorF;
    };
    byId('fungsiYa').addEventListener('click', function(){ cekFungsi(true); });
    byId('fungsiTidak').addEventListener('click', function(){ cekFungsi(false); });
    fgBaru.addEventListener('click', soalFungsi); soalFungsi();
  }
  // A.5 Tabel otomatis
  var tabelA=byId('tabelA');
  if(tabelA){
    var renderTabel=function(){
      var a=parseFloat(tabelA.value)||0, b=parseFloat(byId('tabelB').value)||0, rows=[];
      for(var x=0;x<=5;x++) rows.push('x='+x+' → f(x)='+(a*x+b));
      byId('tabelOut').textContent='f(x) = '+a+'x + '+b+'. Tabel: '+rows.join(' • ');
    };
    tabelA.addEventListener('input', renderTabel); byId('tabelB').addEventListener('input', renderTabel); renderTabel();
  }
  // A.6 Titik pada garis
  var titikBtn=byId('titikCek');
  if(titikBtn){
    var gambarTitik=function(){
      var m=parseFloat(byId('titikM').value), c=parseFloat(byId('titikC').value), x=parseFloat(byId('titikX').value)||0, y=parseFloat(byId('titikY').value)||0;
      var harus=m*x+c, diGaris=Math.abs(y-harus)<0.001;
      byId('titikOut').textContent='y = '+m+'x + '+c+'. Untuk x = '+x+', y seharusnya '+fmt(harus)+'. Titik ('+x+', '+y+') '+(diGaris?'✅ ADA di garis.':'❌ TIDAK di garis.')+'';
      var canvas=byId('titikCanvas'), ctx=canvas.getContext('2d');
      var dispW=Math.max(280, canvas.clientWidth||560), dispH=Math.round(dispW*300/560), dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.round(dispW*dpr); canvas.height=Math.round(dispH*dpr); ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,dispW,dispH);
      var S=20, ox=dispW/2, oy=dispH/2;
      ctx.strokeStyle='#dbe1f0'; ctx.beginPath(); ctx.moveTo(0,oy); ctx.lineTo(dispW,oy); ctx.stroke(); ctx.beginPath(); ctx.moveTo(ox,0); ctx.lineTo(ox,dispH); ctx.stroke();
      ctx.strokeStyle='#ff5ca8'; ctx.lineWidth=3; ctx.beginPath();
      for(var px=0; px<=dispW; px++){ var xv=(px-ox)/S, yv=m*xv+c, py=oy-yv*S; if(px===0) ctx.moveTo(px,py); else ctx.lineTo(px,py); }
      ctx.stroke();
      ctx.fillStyle='#172033'; ctx.beginPath(); ctx.arc(ox+x*S, oy-y*S, 7, 0, 7); ctx.fill();
    };
    titikBtn.addEventListener('click', gambarTitik);
    ['titikM','titikC','titikX','titikY'].forEach(function(id){ byId(id).addEventListener('input', gambarTitik); });
    requestAnimationFrame(gambarTitik); setTimeout(gambarTitik,50);
  }
  // A.6 Game gradien
  var gradBaru=byId('gradienBaru');
  if(gradBaru){
    var skorG=0, jawabG=0;
    var soalGradien=function(){
      var x1=0, y1=0, x2=2+Math.floor(Math.random()*4), y2=(2+Math.floor(Math.random()*4))* (Math.random()<0.5?1:-1);
      // Buat gradien bulat sederhana
      var m=1+Math.floor(Math.random()*3); y2=m*x2;
      jawabG=m;
      byId('gradienSoal').textContent='Titik (0, 0) dan ('+x2+', '+y2+'). Berapa gradiennya?';
      byId('gradienJawab').value=''; byId('gradienOut').textContent='Hitung (y2 - y1) / (x2 - x1).';
    };
    byId('gradienCek').addEventListener('click', function(){
      var v=parseFloat((byId('gradienJawab').value||'').replace(',','.'));
      if(isNaN(v)){ byId('gradienOut').textContent='Tulis dulu gradiennya, ya.'; return; }
      if(Math.abs(v-jawabG)<0.01){ skorG++; byId('gradienOut').textContent='🎉 Benar! Gradiennya '+jawabG+'.'; } else { byId('gradienOut').textContent='Belum tepat. Jawaban yang benar adalah '+jawabG+'.'; }
      byId('gradienSkor').textContent='Skor: '+skorG;
    });
    gradBaru.addEventListener('click', soalGradien); soalGradien();
  }
  // A.6 Sejajar / tegak lurus
  var sejM1=byId('sejajarM1');
  if(sejM1){
    var renderSejajar=function(){
      var m1=parseFloat(sejM1.value), m2=parseFloat(byId('sejajarM2').value), hub='';
      if(m1===m2) hub='Kedua garis SEJAJAR (gradien sama).';
      else if(Math.abs(m1*m2+1)<0.001) hub='Kedua garis TEGAK LURUS (hasil kali gradien = -1).';
      else hub='Kedua garis BERPOTONGAN (gradien berbeda dan tidak tegak lurus).';
      byId('sejajarOut').textContent='m1 = '+m1+', m2 = '+m2+'. '+hub;
    };
    sejM1.addEventListener('input', renderSejajar); byId('sejajarM2').addEventListener('input', renderSejajar); renderSejajar();
  }
  // D.3 Simulasi survei kantin
  var surveiBtn=byId('surveiBtn');
  if(surveiBtn){
    surveiBtn.addEventListener('click', function(){
      var populasi=['Bakso','Bakso','Bakso','Bakso','Bakso','Bakso','Nasi Goreng','Nasi Goreng','Nasi Goreng','Gado-gado'];
      var hitung={Bakso:0,'Nasi Goreng':0,'Gado-gado':0};
      for(var i=0;i<20;i++){ var s=populasi[Math.floor(Math.random()*populasi.length)]; hitung[s]++; }
      byId('surveiOut').textContent='Sampel 20 siswa: Bakso '+hitung.Bakso+', Nasi Goreng '+hitung['Nasi Goreng']+', Gado-gado '+hitung['Gado-gado']+'. Populasi aslinya: Bakso 60%, Nasi Goreng 30%, Gado-gado 10%. Bandingkan, lalu ulangi beberapa kali.';
      var mx=Math.max(hitung.Bakso, hitung['Nasi Goreng'], hitung['Gado-gado'], 1);
      byId('surveiChart').innerHTML=[
        '<div style="height:'+(hitung.Bakso/mx*130+10)+'px">'+hitung.Bakso+'</div>',
        '<div style="height:'+(hitung['Nasi Goreng']/mx*130+10)+'px">'+hitung['Nasi Goreng']+'</div>',
        '<div style="height:'+(hitung['Gado-gado']/mx*130+10)+'px">'+hitung['Gado-gado']+'</div>'
      ].join('');
    });
  }
  // D.3 Game populasi vs sampel
  var popBaru=byId('popGameBaru');
  if(popBaru){
    var skorPop=0, jawabPop='';
    var soalPop=function(){
      var pilihan=[
        {teks:'Seluruh siswa Kelas VIII di sekolah (240 siswa) yang diteliti menu kantinnya.', jawab:'Populasi'},
        {teks:'30 siswa yang dipilih acak untuk ditanya menu kantin favoritnya.', jawab:'Sampel'},
        {teks:'Semua nilai ulangan Matematika satu kelas yang dihitung rata-ratanya.', jawab:'Populasi'},
        {teks:'10 siswa per kelas yang dipilih untuk mewakili seluruh sekolah.', jawab:'Sampel'}
      ];
      var p=pilihan[Math.floor(Math.random()*pilihan.length)];
      jawabPop=p.jawab;
      byId('popGameSoal').textContent=p.teks;
      byId('popGameOut').textContent='Apakah ini populasi atau sampel?';
    };
    var cekPop=function(jawab){
      if(jawab===jawabPop){ skorPop++; byId('popGameOut').textContent='🎉 Benar! Ini '+jawabPop+'.'; } else { byId('popGameOut').textContent='Belum tepat. Jawaban yang benar adalah '+jawabPop+'.'; }
      byId('popGameSkor').textContent='Skor: '+skorPop;
    };
    byId('popPopulasi').addEventListener('click', function(){ cekPop('Populasi'); });
    byId('popSampel').addEventListener('click', function(){ cekPop('Sampel'); });
    popBaru.addEventListener('click', soalPop); soalPop();
  }
  // D.3 Teknik sampling
  var teknikSel=byId('teknikSelect');
  if(teknikSel){
    var renderTeknik=function(){
      var teks={
        acak:'Acak sederhana: setiap siswa punya peluang yang sama untuk terpilih, misalnya dengan undian nomor absen.',
        strata:'Berstrata: populasi dibagi kelompok (misalnya per kelas), lalu diambil sampel dari tiap kelompok secara proporsional.',
        sistematis:'Sistematis: pilih setiap siswa ke-n, misalnya setiap siswa nomor kelipatan 5 dari daftar absen.',
        klaster:'Klaster: pilih beberapa kelompok utuh (misalnya 2 kelas), lalu teliti semua siswa di kelas terpilih itu.'
      };
      byId('teknikOut').textContent=teks[teknikSel.value];
    };
    teknikSel.addEventListener('change', renderTeknik); renderTeknik();
  }
  // D.4 Geser nilai ekstrem
  var outSlider=byId('outlierSlider');
  if(outSlider){
    var renderOutlier=function(){
      var data=[6,7,8,7,9], ekstrim=parseInt(outSlider.value,10), gabung=data.concat([ekstrim]);
      var meanAwal=data.reduce(function(s,v){return s+v;},0)/data.length;
      var meanBaru=gabung.reduce(function(s,v){return s+v;},0)/gabung.length;
      var urut=gabung.slice().sort(function(a,b){return a-b;});
      var medBaru=urut[Math.floor(urut.length/2)];
      byId('outlierOut').textContent='Data awal mean = '+fmt(meanAwal)+'. Setelah ditambah '+ekstrim+', mean menjadi '+fmt(meanBaru)+', median menjadi '+fmt(medBaru)+'. Perhatikan: mean berubah jauh, median hampir tidak berubah.';
    };
    outSlider.addEventListener('input', renderOutlier); renderOutlier();
  }
  // D.4 Game ukuran pemusatan
  var statBaru=byId('statGameBaru');
  if(statBaru){
    var skorS=0, jawabS=0;
    var soalStat=function(){
      var jenis=['mean','median','modus'][Math.floor(Math.random()*3)];
      var dataSets = jenis==='modus' ? [[2,3,3,5,7],[5,5,6,7,9],[3,4,4,4,9]] : [[4,6,8,10],[2,3,3,5,7],[5,5,6,7,9],[3,4,4,4,9],[7,8,7,9,8]];
      var data=dataSets[Math.floor(Math.random()*dataSets.length)];
      var sorted=data.slice().sort(function(a,b){return a-b;});
      var mean=data.reduce(function(s,v){return s+v;},0)/data.length;
      var med=sorted.length%2 ? sorted[Math.floor(sorted.length/2)] : (sorted[sorted.length/2-1]+sorted[sorted.length/2])/2;
      var freq={}; data.forEach(function(v){ freq[v]=(freq[v]||0)+1; });
      var maxF=Math.max.apply(null, Object.values(freq));
      var modus=parseFloat(Object.keys(freq).filter(function(k){ return freq[k]===maxF; })[0]);
      jawabS = jenis==='mean' ? mean : jenis==='median' ? med : modus;
      byId('statGameSoal').textContent='Data: '+data.join(', ')+'. Berapa '+jenis+'-nya?';
      byId('statGameJawab').value=''; byId('statGameOut').textContent='Hitung '+jenis+' dari data di atas.';
      statBaru.dataset.jenis=jenis;
    };
    byId('statGameCek').addEventListener('click', function(){
      var v=parseFloat((byId('statGameJawab').value||'').replace(',','.'));
      if(isNaN(v)){ byId('statGameOut').textContent='Tulis dulu jawabannya, ya.'; return; }
      if(Math.abs(v-jawabS)<0.01){ skorS++; byId('statGameOut').textContent='🎉 Benar! Jawabannya '+fmt(jawabS)+'.'; } else { byId('statGameOut').textContent='Belum tepat. Jawaban yang benar adalah '+fmt(jawabS)+'.'; }
      byId('statGameSkor').textContent='Skor: '+skorS;
    });
    statBaru.addEventListener('click', soalStat); soalStat();
  }
  // D.4 Bandingkan dua kelas
  var bandingBtn=byId('bandingBtn');
  if(bandingBtn){
    bandingBtn.addEventListener('click', function(){
      var A=[7,8,7,9,8], B=[6,7,6,8,7];
      var meanA=A.reduce(function(s,v){return s+v;},0)/A.length;
      var meanB=B.reduce(function(s,v){return s+v;},0)/B.length;
      byId('bandingOut').textContent='Mean Kelas A = '+fmt(meanA)+', mean Kelas B = '+fmt(meanB)+'. '+(meanA>meanB?'Kelas A lebih tinggi '+fmt(meanA-meanB)+' poin.':'Kelas B lebih tinggi.')+'';
    });
  }
})();
