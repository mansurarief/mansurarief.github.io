---
layout: default
title: Spare Parts Inventory Control - An Introduction
permalink: spare-parts-inventory-control-1
tags: [optimization]
published: true
---

## Spare Parts Inventory Control - An Introduction in Bahasa Indonesia

Oleh: [Mansur M. Arief](https://mansurarief.github.io/)

**Keterangan**: Catatan ini memberikan gambaran singkat tentang pengelolaan persediaan suku cadang, mekanisme pengendalian persediaan, dan evaluasi kinerja kebijakan persediaan dengan metode deterministik dan stokastik, sebagai bahan pembelajaran tambahan mendampingi [handout Spare-Parts Inventory Control Management](/assets/pdf/spare-part-inv-ctrl-handout-1.pdf). Catatan ini ditujukan untuk mahasiswa PJJ PLN, Program Studi Magister Teknik Industri, Departemen Teknik dan Sistem Industri, Institut Teknologi Sepuluh Nopember (ITS) Surabaya, Indonesia.

---

Di beragam industri, **pengelolaan suku cadang (*spare parts*)** merupakan hal yang penting. Suku cadang digunakan untuk memperbaiki atau mengganti komponen yang rusak pada peralatan produksi. Pengelolaan suku cadang yang baik akan **memastikan kelancaran operasi produksi dan meminimalkan kerugian akibat kegagalan peralatan**.

Dalam konteks operasi PLN, pengelolaan suku cadang juga penting untuk:

- **bagi internal PLN**: memastikan ketersediaan suku cadang yang diperlukan untuk
  - perbaikan dan pemeliharaan peralatan produksi listrik,
  - pemeliharaan perangkat transmisi dan distribusi listrik, serta
  - peralatan kantor dan operasional.
- **bagi pelanggan PLN**: pengelolaan suku cadang yang baik akan
  - memastikan ketersediaan alat listrik untuk memenuhi permintaan naik daya listrik
  - meminimalkan gangguan pasokan listrik akibat kegagalan peralatan, serta
  - memastikan ketersediaan suku cadang untuk perbaikan dan pemeliharaan peralatan pelanggan.

Pengelolaan suku cadang yang baik akan memastikan *service level* yang baik, yaitu ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat. Selain itu, pengelolaan baik juga akan meminimalkan biaya persediaan suku cadang, termasuk biaya penyimpanan (*inventory holding cost*), biaya pemesanan (*order cost*), dan biaya kekurangan stok (*stockout cost*).

### 1. Pengelolaan Persediaan Suku Cadang

Pengelolaan persediaan suku cadang cukup unik, karena:

- Permintaan dan pasokan suku cadang bersifat **stokastik**.
  - Permintaan suku cadang bersifat intermiten dan tidak terduga.
  - Jumlah item (SKUs) suku cadang biasanya besar.
  - Sebagian besar suku cadang bergerak lambat, sehingga pengelolaannya cukup sulit (perlu prioritas).
  
- **Biaya persediaan** suku cadang biasanya tinggi.
- **Pemangku kepentingan berbeda** (internal dan eksternal).
  - Pelanggan internal (misalnya, lini produksi, pemeliharaan, dll.)
  - Pemasok eksternal (OEM, vendor pihak ketiga, dll.)
- **Waktu tunggu pemesanan** (*order lead time*) biasanya lama.
- **Data** seringkali tidak lengkap (tidak tersedia data historis permintaan yang lengkap).

Keunikan ini membuat pengelolaan persediaan suku cadang menjadi tantangan tersendiri, dibandingkan dengan pengelolaan persediaan barang konsumsi atau barang modal lainnya. Misalnya, **pola permintaan yang bersifat intermiten** (jarang terjadi) dan tidak terduga membuat pengelolaan persediaan suku cadang memerlukan pendekatan yang berbeda bila dibandingkan dengan pengelolaan persediaan **barang konsumsi yang permintaannya cukup stabil dan mengikuti pola musiman**. Selain itu, *stockout cost* yang biasanya sangat tinggi membuat pengelolaan persediaan suku cadang harus memperhatikan *service level* yang tinggi, yaitu memastikan ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat.

### 2. Rangkuman Materi Mekanisme Pengendalian Persediaan (*Inventory Control*)

Tujuan utama *inventory control* adalah menentukan keseimbangan yang optimal antara *cost* dan *service level*. Kedua tujuan ini seringkali bertentangan, sehingga diperlukan kebijakan persediaan yang tepat untuk mencapai keseimbangan tersebut. Untuk dapat menjamin service level yang tinggi (misal ketersediaan stok 95%, waktu tunggu pesanan 2 hari, turnover persediaan 10 kali setahun), perusahaan harus menyediakan stok yang cukup tinggi setiap saat, melakukan negosiasi yang baik dengan vendor agar *order lead time* dapat dipersingkat, dan mampu memonitor tingkat persediaan secara akurat, dan lain sebagainya. Namun, semua upaya ini akan menimbulkan biaya penyimpanan dan biaya pemesanan yang tinggi. Sebaliknya, untuk meminimalkan biaya persediaan, perusahaan harus bersedia mengorbankan service level di tingkat yang lebih rendah, yang berarti risiko kekurangan stok akan lebih tinggi dan dapat berdampak pada kepuasan pelanggan.

Pelaksanaan *inventory control* biasanya menggunakan kebijakan persediaan yang sederhana (seperti kebijakan $$(s, Q)$$, $$(R, S)$$, dan $$(s, S)$$). Kebijakan ini memungkinkan perusahaan untuk menentukan **kapan** dan **berapa banyak pesanan** yang harus ditempatkan, berdasarkan tingkat persediaan yang ada dan tingkat permintaan yang diperkirakan. Sebagai contoh, kebijakan $$(s, Q)$$ berarti perusahaan akan memesan $$Q$$ unit suku cadang setiap kali tingkat persediaan mencapai $$s$$ unit, sedangkan kebijakan $$(R, S)$$ berarti perusahaan akan meninjau persediaan setiap $$R$$ waktu dan mengisi persediaan hingga mencapai $$S$$ unit. Nilai $$s$$, $$Q$$, $$R$$, dan $$S$$ ini biasanya ditentukan berdasarkan analisis historis permintaan, biaya persediaan, dan kebijakan perusahaan menggunakan pendekatan matematis, analitis, atau heuristik.

Dalam pelaksanaannya, *inventory control* yang efektif membutuhkan sistem monitoring persediaan stok yang baik, sistem informasi yang terintegrasi, dan kerjasama yang baik antara berbagai fungsi di perusahaan (misalnya, produksi, pemeliharaan, pembelian, dan keuangan). Dengan demikian, perusahaan dapat memastikan ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat, sehingga operasi produksi dapat berjalan dengan lancar dan biaya persediaan dapat dikelola dengan efisien. Informasi yang seringkali dibutuhkan, termasuk:

- **Tingkat persediaan stok di gudang (*inventory level/inventory on-hand*)**: jumlah suku cadang yang tersedia di gudang pada suatu waktu tertentu.
- **Tingkat persediaan dalam perjalanan (*in-transit inventory*)**: jumlah suku cadang yang sedang dalam perjalanan dari pemasok ke gudang.
- **Posisi inventory (*inventory position*)**: jumlah suku cadang yang tersedia di gudang ditambah jumlah suku cadang yang sedang dalam perjalanan (biasanya dikurangi dengan jumlah pesanan yang belum dipenuhi (*backorder*)).
- **Permintaan aktual (*actual demand*)**: jumlah suku cadang yang diminta oleh pelanggan atau departemen internal.
- **Lead time**: waktu yang diperlukan untuk memesan, mengirim, dan menerima suku cadang dari pemasok.

Dengan informasi ini, perusahaan dapat menghitung *reorder point*, *reorder quantity*, dan *lead time demand* yang diperlukan untuk menjaga *service level* yang diinginkan dan meminimalkan biaya persediaan.

- **Reorder point ($$s$$)**: tingkat persediaan stok yang menandakan bahwa perlu dilakukan pemesanan ulang, seringkali dihitung berdasarkan *lead time demand* dan *service level* yang diinginkan.
- **Reorder quantity ($$Q$$)**: jumlah suku cadang yang dipesan setiap kali *reorder point* tercapai, seringkali dihitung berdasarkan *lead time demand* dan biaya pemesanan.
- **Lead time demand**: jumlah suku cadang yang diperlukan selama *lead time*, seringkali dihitung berdasarkan *historical demand* dan *lead time* yang diperkirakan.

Gambar di bawah ini menunjukkan contoh *inventory plot* yang menunjukkan tingkat persediaan stok, *reorder point*, dan *reorder quantity* untuk kebijakan persediaan $$(s, Q)$$.

![Inventory Plot](/assets/courses/inv-ctrl/inventory_plot_a.png)

Gambar di atas menunjukkan beberapa hal:

- *Reorder point* ($$s$$) 20 unit, dan *reorder quantity* ($$Q$$) 30 unit.
- Ketika tingkat persediaan stok mencapai 20 unit, perusahaan akan memesan 30 unit suku cadang dari vendor.
- Segera setelah pemesanan dilakukan, *inventory position* akan kembali ke tingkat 50 unit, sedangkan *inventory level (on-hand)* belum bertambah hingga pesanan tiba.
- Selisih waktu antara pemesanan dan kedatangan suku cadang dari vendor disebut *lead time*.
- Stockout terjadi ketika permintaan melebihi tingkat persediaan stok, sangat rentan terjadi selama *lead time*.
- Oleh karena itu, perusahaan harus memastikan bahwa *reorder point* dan *reorder quantity* yang ditentukan sudah memperhitungkan *lead time demand*, variasi demand, dan *service level* yang diinginkan.

Silakan review materi kuliah sebelumnya untuk penjelasan yang lebih detail tentang konsep *inventory control* lainnya.

### Kuis Singkat #1 (Ungraded)

**Sebelum melanjutkan ke materi berikutnya, silakan evaluasi pemahaman Anda dengan menjawab pertanyaan berikut:**


<!-- Quiz for this section  -->
{% for quiz in site.data.quiz_inv_ctrl_1 %}
{% include quiz.html id=quiz.id question=quiz.question options=quiz.options %}
{% endfor %}

### 3. Metrik Evaluasi Kebijakan Persediaan

Kebijakan persediaan yang baik harus dievaluasi berdasarkan beberapa metrik kinerja, antara lain:

- **Service level**: probabilitas tidak terjadinya stockout, seringkali diukur sebagai 1 dikurangi probabilitas terjadinya stockout.
- **Stockout cost**: biaya akibat kekurangan stok, seringkali dihitung sebagai biaya kehilangan penjualan atau biaya kegagalan peralatan.
- **Holding cost**: biaya penyimpanan suku cadang, seringkali dihitung berdasarkan biaya penyimpanan per unit per periode.
- **Order cost**: biaya pemesanan suku cadang, seringkali dihitung berdasarkan biaya pemesanan per pesanan.
- **Total cost**: biaya total yang terdiri dari stockout cost, holding cost, dan order cost.

Metrik-metrik ini akan memberikan gambaran yang lebih lengkap tentang kinerja kebijakan persediaan, dan membantu perusahaan untuk menentukan kebijakan yang optimal. Umumnya, ada banyak metrik lain yang dapat digunakan, tergantung pada kebutuhan dan karakteristik perusahaan. Perusahaan akan memilih metrik yang paling relevan dengan tujuan dan strategi bisnis perusahaan. Dalam prakteknya, cara yang paling sederhana untuk menghitung metrik ini adalah dengan mengumpulkan data dan menghitung metrik tersebut berdasarkan data yang ada. 

Misalnya, perusahaan dapat menghitung service level berdasarkan jumlah stockout yang terjadi selama periode tertentu, dan menghitung biaya total berdasarkan biaya penyimpanan, biaya pemesanan, dan biaya kekurangan stok yang terjadi. Dengan demikian, perusahaan dapat mengevaluasi kinerja kebijakan persediaan yang ada dan memutuskan apakah perlu dilakukan perubahan atau penyesuaian. Sebagai contoh, manajer persediaan memiliki data sebagai berikut:

- **Biaya penyimpanan**: Rp. 5.000/unit/hari
- **Biaya pemesanan**: Rp. 50.000/pesanan
- **Biaya kekurangan stok**: Rp. 10.000.000/kejadian
- **Tingkat persediaan awal**: 50 unit
- **Periode perencanaan**: 365 hari

Kebijakan persediaan yang dievaluasi, misalnya:

- Kebijakan (s, Q): $$s=20$$, $$Q=30$$
- Kebijakan (R, S): $$R=30$$, $$S=50$$
- Kebijakan (s, S): $$s=20$$, $$S=50$$

### 4. Evaluasi Kebijakan Persediaan secara Deterministik (Single-Run)

Bila **data prediksi demand selama periode perencanaan sudah tersedia**, perusahaan dapat menghitung metrik kinerja kebijakan persediaan tersebut secara deterministik. Misalnya, perusahaan dapat menghitung service level, biaya total, biaya penyimpanan, biaya pemesanan, dan biaya kekurangan stok yang dihasilkan oleh masing-masing kebijakan persediaan. Hasil evaluasi ini akan memberikan gambaran kinerja kebijakan persediaan yang diterapkan, dan membantu perusahaan untuk menentukan kebijakan yang paling optimal.


| Kebijakan Persediaan | Service Level | Total Biaya| Biaya Penyimpanan | Biaya Pemesanan | Biaya Stockout |
|----------------------|---------------|-------------|-------------------|-----------------|------------------|
| (s=20, Q=30)         | 100.00%       | 44.01       | 43.66             | 0.35            | 0.00                  |
| (R=30, S=50)         | 100.00%      | 56.33                           | 55.73             | 0.60            | 0.00                  |
| (s=20, S=50)         | 100.00%      | 47.78                           | 47.44             | 0.35            | 0.00                  |

*Semua biaya dalam (juta Rupiah)

Penting untuk dipahami bahwa metrik ini dihitung berdasarkan *inventory level* dan skema pemesanan yang dihasilkan oleh kebijakan persediaan yang diterapkan, dengan **mengasumsikan demand aktual selama periode perencanaan sesuai dengan prediksi yang ada**. Inventory plot di bawah ini menunjukkan contoh profil persediaan yang dihasilkan oleh masing-masing kebijakan persediaan.

![Inventory Plot](/assets/courses/inv-ctrl/inventory_sim_spare_parts.png)

Mencermati hasil evaluasi kebijakan persediaan di atas, manajer persediaan dapat mengevaluasi kinerja kebijakan persediaan yang ada dan memutuskan kebijakan mana yang paling optimal untuk diterapkan dalam operasi sehari-hari. Dengan demikian, perusahaan dapat memastikan ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat, serta meminimalkan biaya persediaan yang dikeluarkan, **bila prediksi demand sesuai dengan kenyataan**.

Apa yang akan terjadi jika **demand aktual tidak sesuai dengan prediksi yang ada**? Bisa saja kebijakan persediaan yang dianggap optimal berdasarkan prediksi demand ternyata tidak optimal ketika dihadapkan dengan demand aktual yang berbeda. Contoh berikut menunjukkan hasil evaluasi kebijakan persediaan yang sama, namun dengan demand aktual yang berbeda.

**Contoh Realisasi Demand #1**

| Kebijakan Persediaan | Service Level | Total Biaya| Biaya Penyimpanan | Biaya Pemesanan | Biaya Stockout |
|----------------------|---------------|-------------|-------------------|-----------------|------------------|
| (s=20, Q=30)         | 98.63%       | 111.72       | 41.31             | 0.40            | 70.00                  |
| (R=30, S=50)         | 100.00%      | 50.92                           | 50.33             | 0.60            | 0.00                  |
| (s=20, S=50)         | 99.45%      | 65.83                           | 45.48             | 0.35            | 20.00                  |

<img src="/assets/courses/inv-ctrl/demand_sim_xyz.png" width="80%" alt="Demand Samples from UP3 XYZ">

Di realisasi demand di atas, terlihat bahwa beberapa kebijakan persediaan yang dianggap optimal berdasarkan prediksi demand, ternyata tidak optimal ketika dihadapkan dengan demand aktual yang berbeda. Kebijakan (s,Q) dan (s,S) yang diprediksi memberi service level 100%, ternyata memberikan service level yang lebih rendah ketika dihadapkan dengan demand aktual. Akibatnya juga, biaya stockout yang dihasilkan oleh kebijakan (s,Q) menjadi sangat tinggi, karena permintaan melebihi tingkat persediaan stok yang ada. Dapat dilihat di gambar di atas bahwa stockout terjadi pada beberapa periode, khususnya selama stok yang telah dipesan belum tiba. Hal yang sama juga terjadi pada kebijakan (s,S), meskipun biaya stockout yang dihasilkan lebih rendah dibandingkan dengan kebijakan (s,Q).

**Contoh Realisasi Demand #1**

| Kebijakan Persediaan | Service Level | Total Biaya| Biaya Penyimpanan | Biaya Pemesanan | Biaya Stockout |
|----------------------|---------------|-------------|-------------------|-----------------|------------------|
| (s=20, Q=30)         | 100.00%       | 44.49       | 44.14             | 0.35            | 0.00                  |
| (R=30, S=50)         | 100.00%      | 56.97                           | 56.37             | 0.60            | 0.00                  |
| (s=20, S=50)         | 99.73%      | 61.39                           | 51.05             | 0.35            | 10.00                  |

<img src="/assets/courses/inv-ctrl/demand_sim_zyx.png" width="80%" alt="Demand Samples from UP3 ZYX">

Di realisasi demand ini, terlihat bahwa kebijakan persediaan (s,S) juga mengalami penurunan service level dan peningkatan biaya stockout ketika dihadapkan dengan demand aktual yang berbeda. Terlihat bahwa biaya stockout yang dihasilkan oleh kebijakan (s,S) menjadi lebih tinggi, karena permintaan melebihi tingkat persediaan stok yang ada. Hal ini menunjukkan bahwa kebijakan persediaan yang dianggap optimal berdasarkan prediksi demand, ternyata tidak optimal ketika dihadapkan dengan demand aktual yang berbeda.

**Kesimpulan**

Dari contoh di atas, terlihat bahwa hasil evaluasi kebijakan persediaan dapat berbeda tergantung pada demand aktual yang terjadi. Evaluasi *deterministik (single-run)* memberikan gambaran kinerja kebijakan persediaan **berdasarkan prediksi demand yang ada, namun ketika demand aktual berbeda, hasil evaluasi tersebut mungkin tidak lagi berlaku**, sehingga perusahaan perlu mempertimbangkan mekanisme evaluasi yang mempertimbangkan ketidakpastian demand yang ada. Salah satu mekanisme evaluasi yang dapat digunakan adalah *evaluasi stokastik (multi-run/simulasi)*, yang **memungkinkan perusahaan untuk memperhitungkan ketidakpastian demand dan biaya, serta memperoleh gambaran yang lebih lengkap tentang kinerja kebijakan persediaan**.


### 5. Evaluasi Stokastik (Multi-run/Simulasi)

Dalam evaluasi stokastik, perusahaan menggunakan **data demand yang lebih banyak (misalnya 100 sampel) untuk menghitung metrik kinerja kebijakan persediaan**. Dengan menggunakan data demand yang lebih banyak, perusahaan dapat menghitung metrik kinerja kebijakan persediaan yang lebih akurat dan dapat diandalkan, serta memperhitungkan variasi demand yang mungkin terjadi. Dengan demikian, perusahaan dapat menentukan kebijakan persediaan yang optimal yang **meminimalkan biaya total dan mempertahankan service level yang dapat diterima**.

Penggunaan beberapa sampel (realisasi) data demand yang lebih banyak menghasilkan data metrik kinerja untuk setiap sampel demand. Data ini kemudian dapat digunakan untuk menghitung rata-rata dan standar deviasi dari metrik kinerja tersebut yang dapat memberikan gambaran yang lebih lengkap tentang kinerja kebijakan persediaan yang diterapkan. Selain itu, pengambil keputusan juga dapat menunjukkan histogram dari metrik kinerja tersebut, yang dapat memberikan gambaran yang lebih jelas tentang variasi kinerja kebijakan persediaan yang mungkin terjadi dan mengambil keputusan yang lebih baik.

**Contoh Evaluasi Multi-run**

Dengan 100 sampel data demand selama satu tahun, perusahaan dapat menghitung metrik kinerja kebijakan persediaan sebagai berikut:

| Kebijakan Persediaan | Service Level | Total Biaya| Biaya Penyimpanan | Biaya Pemesanan | Biaya Stockout |
|----------------------|---------------|-------------|-------------------|-----------------|------------------|
| (s, Q)              | 99.79% $\pm$ 0.33% | 58.49 $\pm$ 18.84 | 45.55 $\pm$ 1.99 | 0.34 $\pm$ 0.03 | 12.60 $\pm$ 19.78 |
| (R, S)              | 99.97% $\pm$ 0.18% | 56.97 $\pm$ 11.97 | 54.07 $\pm$ 2.80 | 0.60 $\pm$ 0.00 | 2.30 $\pm$ 12.64 |
| (s, S)              | 99.83% $\pm$ 0.34% | 56.20 $\pm$ 19.14 | 46.27 $\pm$ 1.90 | 0.33 $\pm$ 0.03 | 9.60 $\pm$ 19.39 |

*Semua biaya dalam (juta Rupiah)

Untuk setiap metrik, tabel di atas menunjukkan rata-rata $$\pm$$ standar deviasi dari metrik tersebut. Terlihat bahwa beberapa kebijakan mempunyai variasi kinerja yang lebih besar dibandingkan dengan kebijakan lain, yang menunjukkan bahwa kebijakan tersebut lebih sensitif terhadap variasi demand yang terjadi. Dengan menggunakan evaluasi stokastik, perusahaan dapat memperoleh gambaran yang lebih lengkap tentang kinerja kebijakan persediaan yang diterapkan dan memutuskan kebijakan mana yang paling optimal untuk diterapkan dalam operasi sehari-hari.

Khusus untuk contoh di atas, pengambil keputusan bisa saja masih mengalami kesulitan untuk menentukan kebijakan persediaan yang optimal, karena variasi kinerja yang masih cukup besar. Histogram berikut menunjukkan distribusi metrik kinerja kebijakan persediaan yang dihasilkan oleh evaluasi stokastik.

![Simulation Results Histograms](/assets/courses/inv-ctrl/simulation_results_histograms.png)

Dari histogram di atas, terlihat bahwa distribusi metrik kinerja kebijakan persediaan memiliki variasi yang cukup besar, yang menunjukkan bahwa kebijakan persediaan yang diterapkan masih memiliki risiko yang signifikan.

- Pengambil keputusan yang ingin meminisasi risiko, mungkin cenderung akan memilih kebijakan yang memberikan kinerja yang lebih stabil dan memiliki variasi yang lebih kecil (seperti kebijakan (R, S) dalam contoh di atas). 
- Adapun pengambil keputusan yang lebih berani mengambil risiko, mungkin akan memilih kebijakan yang memberikan kinerja yang bisa saja lebih baik (misalnya kebijakan (s, Q) dan (s, S)) yang total biayanya bisa saja lebih rendah (namun bisa juga lebih tinggi akibat risiko stockout yang lebih besar). 

**Kesimpulan**

Dari contoh di atas, terlihat bahwa evaluasi stokastik memberikan gambaran yang lebih lengkap tentang kinerja kebijakan persediaan yang diterapkan, dan membantu perusahaan untuk menentukan kebijakan yang optimal yang meminimalkan biaya total dan mempertahankan service level yang dapat diterima. Dengan menggunakan evaluasi stokastik, perusahaan dapat memperhitungkan ketidakpastian demand dan biaya, serta memperoleh gambaran yang lebih lengkap tentang kinerja kebijakan persediaan yang diterapkan khususnya dalam kondisi ketidakpastian yang tinggi.


### 6. Kesimpulan Akhir

Catatan teknis ini memberikan gambaran singkat tentang pengelolaan persediaan suku cadang, mekanisme pengendalian persediaan, dan evaluasi kinerja kebijakan persediaan. 

- Dalam pengelolaan persediaan suku cadang, perusahaan perlu memperhatikan karakteristik unik dari suku cadang, seperti permintaan stokastik, biaya persediaan yang tinggi, dan pemangku kepentingan yang berbeda. 
- Perusahaan perlu menentukan kebijakan persediaan yang tepat berdasarkan analisis historis permintaan, biaya persediaan, dan kebijakan perusahaan untuk menentukan mekanisme pengendalian persediaan yang optimal.
- Untuk melakukan evaluasi kinerja kebijakan persediaan, perusahaan perlu memperhitungkan metrik kinerja seperti service level, biaya total, biaya penyimpanan, biaya pemesanan, dan biaya stockout untuk menentukan kebijakan yang optimal, serta mempertimbangkan ketidakpastian demand yang ada.
- Metode deterministik (single-run) memberikan gambaran kinerja kebijakan persediaan berdasarkan prediksi demand yang ada, namun ketika demand aktual berbeda, hasil evaluasi tersebut mungkin tidak lagi berlaku. 
- Metode stokastik (multi-run/simulasi) memberikan gambaran yang lebih lengkap tentang kinerja kebijakan persediaan yang diterapkan, dan membantu perusahaan untuk menentukan kebijakan yang optimal khususnya dalam kondisi ketidakpastian yang tinggi.

### Kuis Singkat #2 (Ungraded)

**Silakan evaluasi pemahaman Anda dengan menjawab pertanyaan berikut:**

{% for quiz in site.data.quiz_inv_ctrl_2 %}
{% include quiz.html id=quiz.id question=quiz.question options=quiz.options %}
{% endfor %}

<style>
    .quiz-accordion{
      padding-bottom:1rem;
    }
    .reduced-padding {
        padding-top: 0.25rem ;
        padding-bottom: 0.25rem;
    }
    .padding-body-card {
        padding-left: 2rem ;
    }
    .no-bg {
        background-color: rgba(0,0,0,0.01);
    }
    .btn-link {
        color: #b90505;
    }
</style>

*This note is an supplementary material for the lecture "Spare Parts Inventory Control and Management: Stochastic Optimization and Simulation Approaches" by Mansur M. Arief. The lecture is part of the course "Inventory Management" for Master's of Industrial Engineering program, Department of Industrial and Systems Engineering, Institute of Technology Sepuluh Nopember (ITS) Surabaya, Indonesia.*

*Parts of this note are adapted from various sources available online. The examples and illustrations are created by the author for educational purposes. Github Copilot is used to generate some parts of the text. The author has reviewed and edited the text to ensure its accuracy and relevance to the topic.*