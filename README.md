# MathQuest — MPI Matematika SMP

Media Pembelajaran Interaktif Matematika SMP, Kurikulum Merdeka, pendekatan
Pembelajaran Mendalam. Template baru: Peta Misi 4 pos + Lab Interaktif + Lencana.

## Yang sudah jadi
- Kelas VIII lengkap: 11 halaman misi, satu halaman untuk satu TP
  (B.5, B.6, B.7, G.4, A.2, A.3, A.4, A.5, A.6, D.3, D.4)
- Beranda, indeks Kelas VIII, halaman Progres Saya, halaman ATP untuk guru
- Kuis 5 soal per misi dengan umpan balik langsung
- Progres tersimpan di localStorage perangkat murid
- Kirim hasil ke guru: WhatsApp, salin, unduh (.txt), cetak

## Cara publish ke GitHub Pages
```bash
cd mpi
git init
git remote add origin git@github.com:restiyelmasari/mpi.git
git add .
git commit -m "MathQuest Kelas VIII"
git branch -M main
git push -u origin main
```
Lalu di GitHub: Settings > Pages > Deploy from a branch > main / (root).
Alamatnya menjadi https://restiyelmasari.github.io/mpi/

## Catatan teknis
- Situs statis, tanpa build step, tanpa database.
- Semua tautan relatif, jadi aman di subpath /mpi/.
- Kelas VII dan IX masih penanda "Segera Hadir" di beranda.
