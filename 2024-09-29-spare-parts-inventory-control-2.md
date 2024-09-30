---
layout: default
title: Spare Parts Inventory Control - Optimization and Simulation Approaches
permalink: spare-parts-inventory-control-2
tags: [optimization]
published: true
---

## Spare Parts Inventory Control - Optimization and Simulation Approaches

<!-- 
% Section and Frame examples
\section{Review}
\begin{frame}{Review of Last Week's Material}
    \begin{figure}
        \centering
        \includegraphics[height=0.5\textheight]{inventory_plot_a.pdf}
    \end{figure} 
    \begin{itemize}[<+->]
        \item Interpreting inventory plots.
        \item Inventory control for spare parts is unique (vs. other common items).
        \item Inventory policies mostly use simple rules (e.g., (s, Q), (R, S), (s, S)).
        \item The policies are evaluated based on SL and cost (often trade-offs).
        \item The evaluation can be deterministic or stochastic.
    \end{itemize}    
\end{frame}

\begin{frame}{Homework}
    \begin{itemize}[<+->]
        \item Discuss \textbf{Activity \#3} and present to the class.
        \item \textbf{Stochastic demand and cost data}:
        \begin{itemize}
            \item Collect (or simulate) demand data for 1 (one) spare part/product relevant to your organization 
            \begin{itemize}[<.->]
                \item make sure to anonymize the data 
                \item collect at least 10 data points
            \end{itemize}
            \item Collect (or estimate) the costs associated with stockouts, holding, and ordering for the same spare part/product 
            \begin{itemize}[<.->]
                \item make sure to anonymize the data
            \end{itemize}
            \item Discuss these data with your team and present to the class.
        \end{itemize}
    \end{itemize}
\end{frame}

\begin{frame}{Activity \#3: Simulation Results (1)}
    \begin{itemize}   
        \item Does the results change your recommendation? Why or why not?    
        \begin{itemize}
            \item \textbf{Single Run Evaluation}:            
            \begin{table}
                % \centering
                % \caption{Inventory Policy Evaluation Results (in millions of Rupiah)}
                \resizebox{0.65\textwidth}{!}{
                \begin{tabular}{lcrrrr}
                \toprule
                Policy & Service Level & $C_{total}$ & $C_{holding}$ & $C_{order}$ & $C_{stockout}$ \\
                \midrule
                (s=20, Q=30) & 100.00\% & 44.01 & 43.66 & 0.35 & 0.00 \\
                (R=30, S=50) & 100.00\% & 56.33 & 55.73 & 0.60 & 0.00 \\
                (s=20, S=50) & 100.00\% & 47.78 & 47.44 & 0.35 & 0.00 \\
                \bottomrule
                \end{tabular}
                }
            \end{table}
            \normalsize
            \item \textbf{Multi Run Evaluation}:
            \begin{figure}
                \centering
                \includegraphics[height=0.6\textheight]{simulation_results_histograms.pdf}
            \end{figure}
        \end{itemize}
    \end{itemize}   
\end{frame}

\begin{frame}{Activity \#3: Simulation Results (2)}   
    \begin{itemize}   
        \item How would you present the results to your manager?
        \begin{figure}
            \centering
            \includegraphics[height=0.7\textheight]{simulation_results_histograms.pdf}
        \end{figure}
    \end{itemize}   
\end{frame}

\begin{frame}{Activity \#3: Simulation Results (3)}
    \begin{itemize}   
        \item Can you collect multiple demand data in your organization to carry this out? What are the challenges?
        \begin{figure}
            \centering
            \includegraphics[height=0.7\textheight]{simulation_results_histograms.pdf}
        \end{figure}
    \end{itemize}   
\end{frame}

\begin{frame}{Activity \#3: Simulation Results (4)}
    \begin{itemize}   
        \item What other problems in your organization can benefit from stochastic (simulation) evaluation?
        \begin{figure}
            \centering
            \includegraphics[height=0.7\textheight]{simulation_results_histograms.pdf}
        \end{figure}        
    \end{itemize}   
\end{frame}

\begin{frame}{Stochastic demand and cost data}
    \begin{itemize}[<+->]
        \item Collect (or simulate) demand data for 1 (one) spare part/product relevant to your organization 
        \begin{itemize}[<.->]
            \item make sure to anonymize the data 
            \item collect at least 10 data points
        \end{itemize}
        \item Collect (or estimate) the costs associated with stockouts, holding, and ordering for the same spare part/product 
        \begin{itemize}[<.->]
            \item make sure to anonymize the data
        \end{itemize}
        \item Discuss these data with your team and present to the class.
    \end{itemize}
\end{frame}


\section{Optimizing Inventory Policies}
\begin{frame}{How do we choose the best (s, Q) or (R, S) parameters?}
    \begin{itemize}[<+->]
        \item \textbf{Mathematical optimization}: build a model, load the data, and solve.
        \item \textbf{Analytical methods}: use formulas to find the best parameters.
        \item \textbf{Expert judgment}: use experience and intuition to set the parameters.
    \end{itemize}
\end{frame}


\begin{frame}{Activity \#4: Expert Judgment}
    \begin{itemize}[<+->]
        \item Open these two Google spreadsheets (\textbf{sQ\_policy} and \textbf{RS\_policy}):
        \begin{figure}
            \centering
            \includegraphics[height=0.3\textheight]{bit.ly_sQ_policy.png}$\quad \quad \quad \quad \quad$\includegraphics[height=0.3\textheight]{bit.ly_RS_policy.png}\\
            \url{https://bit.ly/sQ_policy}$\quad \quad$\url{https://bit.ly/RS_policy}
        \end{figure}
        
        \item Discuss and find the best (s, Q) and (R, S) parameters (\textbf{6 minutes}) 
        \item Submit your group answers in the Google Form provided: \url{https://forms.gle/pT4Jfy3kMPVNzdxBA}
        \item We'll evaluate your answers and calculate the metrics for each group using \textbf{the same cost data} but \textbf{a different set of demand data}.
        \item \textbf{Share your observations} from this activity!
    \end{itemize}
\end{frame}


\begin{frame}{Analytical Methods (1)}
    \begin{itemize}[<+->]
        \item An alternative to expert judgment is to use analytical methods.
        \item For example, the (s, Q) policy can be optimized using the EOQ formula.
        \item Under the EOQ model, the optimal order quantity $Q^*$ is given by:
        \begin{equation}
            Q^* = \sqrt{\frac{2 \cdot D \cdot C_\text{order}}{C_\text{holding}}}
        \end{equation}
        where 
        \begin{itemize}[<.->]
            \item $D$ is the annual demand, 
            \item $C_\text{order}$ is the ordering cost (per order), and
            \item $C_\text{holding}$ is the holding cost (per unit per year).
        \end{itemize}
        \item The optimal reorder point $s^*$ with safety stock $S_\text{safety}$ is given by:
        \begin{equation}
            s^* = D \cdot L + S_\text{safety}
        \end{equation}
        where
        \begin{itemize}[<.->]
            \item $L$ is the lead time (in years), and 
            \item $S_\text{safety}$ is the safety stock, commonly set to 0.65 times the standard deviation of demand during lead time ($D \cdot L$)
        \end{itemize}
    \end{itemize}
\end{frame}

\begin{frame}{Analytical Methods (2)}
    \begin{itemize}[<+->]
        \item We have:
        \begin{itemize}[<.->]
            \item $C_\text{holding}$: Rp. 5.000/unit/day = Rp. 1.825.000/unit/year
            \item $C_\text{order}$: Rp. 50.000/order            
            \item Planning horizon: 365 days (1 year)
            \item Demand: 224 units/year
        \end{itemize}
        \item We can calculate the optimal (s, Q) parameters as follows:
        \begin{align*}
            Q^* &= \sqrt{\frac{2 \cdot 224 \cdot 50.000}{1.825.000}} = 3.5 \rightarrow 4 \text{ units} \\
        \end{align*}
        \item Assuming $L = $ 20 days and $S_\text{safety} = $ 0 units, we have
        \begin{align*}
            s^* &= 224 \cdot \frac{20}{365} + 0 = 12.3 \rightarrow 13 \text{ units}
        \end{align*}
    \end{itemize}
\end{frame}

\begin{frame}{Analytical Methods (3)}
    \begin{itemize}[<+->]
        \item If you try this so-called \textbf{optimal} parameters ($s^*, Q^*$) for our problem, \textbf{the cost is excessively high}. 
        \begin{table}
            % \centering
            \caption{EOQ Policy Evaluation Results (in millions of Rupiah)}
            \resizebox{0.85\textwidth}{!}{
            \begin{tabular}{lcrrrr}
            \toprule
            Policy & Service Level & $C_{total}$ & $C_{holding}$ & $C_{order}$ & $C_{stockout}$ \\
            \midrule
            (s=13, Q=4) & 90.7\% & 364.05 & 22.05 & 2.00 & 340.00 \\
            \bottomrule
            \end{tabular}
            }
        \end{table}
        \item Your judgment is \textbf{waaay better} than the EOQ model.
        \item \textbf{Why?}       
    \end{itemize}
\end{frame}

\begin{frame}{Analytical Methods (4)}
    \begin{itemize}[<+->]
        \item There's also a formula to select \textbf{the optimal (R, S) parameters}. 
        \item We will skip this, but you can find it in your textbook (\textbf{page 36-40}).
        \item What does \textbf{your intuition} say about the optimal (R, S) parameters?
    \end{itemize}
\end{frame}


\begin{frame}{Mathematical Optimization (1)}
    \begin{itemize}[<+->]
        \item The EOQ model is a simplification of the real world.
        \item We can build a more complex model using \textbf{mathematical optimization}.
        \item For example, we can use the \textbf{stochastic optimization} approach.
        \item In this approach, we optimize the inventory policy by considering the \textbf{stochastic nature of demand}.
    \end{itemize}
\end{frame}


\begin{frame}{Mathematical Optimization (2)}
    \begin{itemize}
        \item A simple (nonlinear) stochastic model is as follows:
        \begin{align*}
            \min_{s, Q} ~& C_{\text{order}} \cdot n_\text{orders} + C_{\text{holding}} \cdot IL_\text{total} + C_{\text{stockout}} \cdot \text{Prob(Stockouts)} \\
            \text{s.t. } & \text{Prob(Stockouts)} \leq 1-\text{SL}
        \end{align*}
        where:
        \begin{itemize}
            \item $n_\text{orders} = \frac{\sum_{i=1}^{n}  D_i}{Q}$ is the number of orders in a planning horizon,
            \item $IL_\text{total} = \sum_{i=1}^{n} IL_n^{\text{end}}$ is the total inventory level (on-hand),
            \item $\text{Prob(Stockouts)}=\frac{\sum_{i=1}^{n} \mathbb{I}(IP_n^{\text{end}} < 0)}{n}$ is the probability of stockouts.
            \item $n$ is the number of days in the planning horizon,
            \item $D_i$ is the demand in day $i$,
            \item $IL_n^{\text{end}}$ is the inventory level (on-hand) at the end of day $n$, and
            \item $IP_n^{\text{end}}$ is the inventory position at the end of day $n$.
        \end{itemize}
    \end{itemize}
\end{frame}

\begin{frame}{Mathematical Optimization (3)}
    \begin{itemize}[<+->]
        \item If we have $K=100$ sets of demand data, we can use the sum (or average) objective:
            \begin{align*}
                \min_{s, Q} \sum_{k=1}^{K}  \left( C_{\text{order}} \cdot n^k_\text{orders} +C_{\text{holding}} \cdot IL^k_\text{total} + C_{\text{stockout}} \cdot \text{Prob}_k \text{(Stockouts)}\right) \\
            \end{align*}
        where:
        \begin{itemize}[<.->]
            \item $n^k_\text{orders}$ is the number of orders for demand data set $k$,
            \item $IL^k_\text{total}$ is the total inventory level (on-hand) for demand data set $k$,
            \item $\text{Prob}_k \text{(Stockouts)}$ is the probability of stockouts for demand data set $k$.
        \end{itemize}
        \item The constraint can also be based on the average service level:
        \begin{align*}
            \frac{1}{K} \sum_{k=1}^{K} \text{Prob}_k \text{(Stockouts)} \leq 1-\text{SL}
        \end{align*}
    \end{itemize}
\end{frame}


\begin{frame}{Mathematical Optimization (4)}
    \begin{itemize}[<+->]
        \item Solving this model requires a \textbf{nonlinear optimization solver}.
        % \item We can also use \textbf{a linearized MILP version of this model}.
        \item If we plot the objective values with 100 demand data, we get this contour plot (to the right of the red line is solutions with SL $\geq$ 99\%)
        \begin{figure}
            \centering
            \includegraphics[height=0.48\textheight]{contour_maps.pdf}
        \end{figure}
        \item Evaluating $(s=25, Q=6)$ policy, we have the best metric!
        \begin{table}
            % \centering
            % \caption{(s=25, Q=6) Policy Evaluation Results (in millions of Rupiah)}
            \resizebox{0.8\textwidth}{!}{
            \begin{tabular}{lcrrrr}
            \toprule
            Policy & Service Level & $C_{total}$ & $C_{holding}$ & $C_{order}$ & $C_{stockout}$ \\
            \midrule
            (s=25, Q=6) & 100\% & 37.85 & 36.15 & 1.70 & 0.00 \\
            \bottomrule
            \end{tabular}
            }
        \end{table}
    \end{itemize}
\end{frame}

\begin{frame}{Metrics Comparison: EOQ vs Stochastic Optimization}
    \begin{table}
        \resizebox{0.73\textwidth}{!}{
        \begin{tabular}{lcrrrr}
        \toprule
        Policy & Service Level & $C_{total}$ & $C_{holding}$ & $C_{order}$ & $C_{stockout}$ \\
        \midrule
        (s=13, Q=4) & 91.6 $\pm$ 2.1\% & 328.3 $\pm$ 78.0 & 20.2 $\pm$ 1.6 & 2.1 $\pm$ 0.1 & 306.0 $\pm$ 78.5 \\
        (s=25, Q=6) & 99.9 $\pm$ 0.2\% & 41.6 $\pm$ 7.7   & 36.2 $\pm$ 1.7 & 1.7 $\pm$ 0.1 & 3.7 $\pm$ 8.2 \\
        (R=7, S=30) & 99.9 $\pm$ 0.3\% & 42.6 $\pm$ 9.5   & 35.6 $\pm$ 1.8 & 2.2 $\pm$ 0.0 & 4.8 $\pm$ 10.2 \\
        \bottomrule
        \end{tabular}
        }
    \end{table}
    \begin{figure}
        % \centering
        \includegraphics[height=0.7\textheight]{policy_metrics.pdf}
    \end{figure}
\end{frame}


\begin{frame}{Activity \#5: Nonstationary Demands}
    \begin{itemize}[<+->]
        \item Each two groups will be given a different model to solve.
        \begin{itemize}[<.->]
            \item Group 1 and 2: Model A (nonstationary demand, long lead time)
            \item Group 3 and 4: Model B (nonstationary demand, short lead time, high order cost)
            \item Group 5 and 6: Model C (nonstationary demand, short lead time, low stockout cost)
        \end{itemize}
        \begin{figure}
            \vspace{-0.5cm}
            \centering
            \includegraphics[height=0.3\textheight]{bit.ly_spareparts-inv-5A.png}$\quad \quad \quad \quad$\includegraphics[height=0.3\textheight]{bit.ly_spareparts-inv-5B.png}$\quad \quad \quad \quad$\includegraphics[height=0.3\textheight]{bit.ly_spareparts-inv-5C.png}\\
            \tiny{\url{bit.ly/spareparts-inv-5A}}$\quad \quad \quad \quad \quad \quad \quad$\tiny{\url{bit.ly/spareparts-inv-5B}}$\quad \quad \quad\quad \quad \quad$\tiny{\url{bit.ly/spareparts-inv-5C}}
        \end{figure}

        \item You will have 10 minutes to pick two sets of (s, Q) parameters.
        \item Share your results with the class.    
    \end{itemize}
\end{frame}

\begin{frame}{Contour Maps of Nonstationary Demand Models}
    \begin{itemize}
        \item \small{A: nonstationary demand, long lead time}
        \begin{figure}            
            \includegraphics[height=0.25\textheight]{contour_maps_5A.pdf}
        \end{figure}
        \vspace{-0.2cm}
        \item \small{B: nonstationary demand, short lead time, high order cost}
        \begin{figure}            
            \includegraphics[height=0.25\textheight]{contour_maps_5B.pdf}
        \end{figure}
        \vspace{-0.2cm}
        \item \small{C: nonstationary demand, short lead time, low stockout cost}
        \begin{figure}            
            \includegraphics[height=0.25\textheight]{contour_maps_5C.pdf}
        \end{figure}
    \end{itemize}
\end{frame}


\section{General Strategies}

\begin{frame}{Critical and Non-Critical Spare Parts} 
    \begin{itemize}[<+->]
        \item Often, spare parts are classified into \textbf{critical} and \textbf{non-critical} parts.
        \item Critical parts are those that are \textbf{essential for operations}.
        \item Non-critical parts can be \textbf{substituted or replaced} with other parts.
        \item Strategies for critical \& non-critical parts can be \textbf{different}.
        \item One can use \textbf{ABC analysis} on spare parts stockout costs and values.
    \end{itemize}
\end{frame}

\begin{frame}{General Inventory Strategies for Spare Parts Management}
    \begin{itemize}[<+->]
        \item \textbf{Centralized vs. decentralized inventory control}: centralize the control of spare parts inventory to reduce costs.
        \item \textbf{Vendor-managed inventory (VMI)}: inventories are managed directly by the vendor, not the buyer.
        \item \textbf{Consignment inventory}: the vendor owns the inventory until used.
        \item \textbf{Just-in-time (JIT) inventory}: inventory is delivered when needed.
        \item \textbf{Collaborative planning, forecasting, and replenishment (CPFR)}: the vendor and the buyer collaborate in planning, forecasting, and replenishment.
    \end{itemize}
\end{frame}

\section{Conclusion}
\begin{frame}{Conclusion and Takeaways}
    \begin{itemize}[<+->]
        \item Differentiating factors for spare parts (vs. general) inventory control
        \item Key factors to consider in evaluating inventory policies
        \item Main information needed for inventory policy optimization
        \item \textbf{What could be useful for you (from the last two sessions)?}
        \item \textbf{What remaining/new questions you have?}
    \end{itemize}
\end{frame}

\begin{frame}
    \centering
    \textbf{Thank you!}\\
    Questions?\\~\\
    \textbf{Ask me offline (\url{mansur.arief@stanford.edu})}\\
    \textbf{or in LinkedIn (\url{https://linkedin.com/in/mansurarief})}\\
\end{frame}

\end{document} -->


Oleh: [Mansur M. Arief](https://mansurarief.github.io/)

**Keterangan**: Catatan ini memberikan gambaran singkat tentang optimasi dan pertimbangan yang penting untuk menentukan kebijakan persediaan spare parts, sebagai bahan pembelajaran tambahan mendampingi [handout Spare-Parts Inventory Control Management](/assets/pdf/spare-part-inv-ctrl-handout-2.pdf). Catatan ini ditujukan untuk mahasiswa PJJ PLN, Program Studi Magister Teknik Industri, Departemen Teknik dan Sistem Industri, Institut Teknologi Sepuluh Nopember (ITS) Surabaya, Indonesia. Ini merupakan part 2 dari kuliah ini, yang membahas pendekatan optimasi stokastik dan simulasi dalam pengelolaan persediaan suku cadang. [Part 1 sebelumnya](/spare-parts-inventory-control-1) membahas perkenalan dan overview singkat pengelolaan persediaan suku cadang.

---

### Pengantar

Seperti telah dibahas sebelumnya, pengelolaan suku cadang yang baik akan memastikan *service level* yang baik, yaitu ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat. Metrik yang penting lainnya adalah efisiensi pengelolaan inventory, yaitu biaya persediaan suku cadang, termasuk biaya penyimpanan (*inventory holding cost*), biaya pemesanan (*order cost*), dan biaya kekurangan stok (*stockout cost*).

Beberapa kebijakan persediaan yang umum digunakan dalam pengelolaan suku cadang adalah kebijakan $$(s, Q)$$ dan $$(R, S)$$. Kebijakan ini memungkinkan perusahaan untuk menentukan **kapan** dan **berapa banyak pesanan** yang harus ditempatkan, berdasarkan tingkat persediaan yang ada dan tingkat permintaan yang diperkirakan. Namun, kebijakan ini seringkali memerlukan penyesuaian dan evaluasi secara berkala, terutama bila kondisi permintaan dan biaya berubah seiring waktu.

**Kebijakan $$(s, Q)$$ (Continuous Review Policy)**

Kebijakan $$(s, Q)$$ berarti perusahaan akan memesan $$Q$$ unit suku cadang setiap kali tingkat persediaan mencapai $$s$$ unit. Dalam konteks ini, $$s$$ disebut juga sebagai *reorder point* atau *reorder level*, yaitu tingkat persediaan yang memicu pemesanan ulang. $$Q$$ adalah jumlah pesanan yang ditempatkan setiap kali pemesanan dilakukan. Kebijakan ini cocok digunakan untuk suku cadang yang permintaannya bersifat stokastik dan tidak terduga, sehingga perusahaan perlu memantau tingkat persediaan secara terus-menerus dan memesan suku cadang hanya ketika diperlukan.

**Kebijakan $$(R, S)$$ (Periodic Review Policy)**

Kebijakan $$(R, S)$$ berarti perusahaan akan meninjau persediaan setiap $$R$$ waktu dan mengisi persediaan hingga mencapai $$S$$ unit. Dalam konteks ini, $$R$$ disebut juga sebagai *review period* atau *review interval*, yaitu interval waktu antara dua pemeriksaan persediaan. $$S$$ adalah tingkat persediaan yang diinginkan setelah pemeriksaan dilakukan atau *order up-to level*. Kebijakan ini cocok digunakan untuk suku cadang yang permintaannya stabil dan dapat diprediksi, sehingga perusahaan dapat menentukan interval waktu yang tepat untuk meninjau persediaan dan memesan suku cadang.

Dalam prakteknya, perusahaan seringkali menggunakan kombinasi dari kedua kebijakan ini, tergantung pada karakteristik suku cadang, biaya persediaan, dan kebijakan perusahaan. Selain itu, perusahaan juga dapat menggunakan pendekatan matematis, analitis, atau simulasi untuk menentukan kebijakan persediaan yang optimal, berdasarkan data historis permintaan, biaya persediaan, dan kebijakan perusahaan.

### Penentuan Kebijakan Persediaan

Penentuan kebijakan persediaan yang optimal dapat dilakukan dengan beberapa pendekatan, antara lain:

1. **Pendekatan Berbasis Pengalaman (Expert Judgment)**: Penentuan kebijakan persediaan berdasarkan pengalaman dan intuisi dari para ahli atau praktisi di perusahaan. Pendekatan ini cocok digunakan untuk suku cadang yang permintaannya stabil dan dapat diprediksi, sehingga para ahli dapat menentukan kebijakan persediaan yang optimal berdasarkan pengetahuan dan pengalaman mereka.
   
   Perlu diperhatikan juga bahwa expert judgment seringkali tetap memerlukan data atau informasi yang akurat dan relevan, sehingga para ahli dapat membuat keputusan yang tepat. Seringkali, expert judgment perlu dikombinasikan dengan pendekatan lain, seperti analisis data atau simulasi, untuk memastikan kebijakan persediaan yang optimal dan sejalan dengan insights dan intuisi para ahli.

2. **Pendekatan Analitis**: Penentuan kebijakan persediaan berdasarkan rumus atau formula matematis yang telah ada, seperti rumus EOQ (Economic Order Quantity) untuk kebijakan $$(s, Q)$$ atau rumus ROP (Reorder Point) untuk kebijakan $$(R, S)$$. Pendekatan ini cocok digunakan untuk suku cadang yang permintaannya stabil dan biaya persediaan yang dapat dihitung dengan mudah, sehingga perusahaan dapat menentukan kebijakan persediaan yang optimal berdasarkan rumus atau formula yang telah ada. 
   
   Untuk suku cadang, model EOQ dan ROP seringkali tidak cukup untuk mengoptimalkan kebijakan persediaan, terutama jika permintaan bersifat intermitten (tidak teratur) atau stokastik (stokastik). Salah satu asumsi utama dari model EOQ dan ROP adalah permintaan yang konstan, yang seringkali tidak terpenuhi bila melihat pola permintaan suku cadang yang sebenarnya. Oleh karena itu, seringkali pendekatan EOQ dan ROP perlu dikombinasikan dengan pendekatan lain, seperti simulasi atau optimasi stokastik.



3. **Pendekaatan Optimasi Matematis**: Penentuan kebijakan persediaan berdasarkan model matematis yang memperhitungkan karakteristik stokastik dari permintaan, biaya persediaan, dan kebijakan perusahaan. Pendekatan ini cocok digunakan untuk suku cadang yang permintaannya stokastik dan biaya persediaan yang kompleks, sehingga perusahaan dapat menentukan kebijakan persediaan yang optimal berdasarkan model matematis yang telah dibangun.
   
   Umumnya, model-model matematis yang digunakan dalam optimasi persediaan adalah model stokastik, yang memperhitungkan ketidakpastian dari permintaan dan biaya persediaan. Seringkali, model yang digunakan adalah model nonlinier, yang memerlukan solver khusus. Gambar di bawah menunjukkan contoh sebaran nilai objektif (service level dan total biaya) dari model optimasi stokastik dengan 100 set data permintaan yang berbeda. Area di sebelah kanan garis merah menunjukkan solusi dengan service level lebih besar atau sama dengan 99%. Jelas terlihat hubungan antara variabel kebijakan persediaan (s, Q) dan nilai objektif (service level dan total biaya) dari model optimasi stokastik ini bersifat nonlinier.

    ![Contour Maps](/assets/courses/inv-ctrl/contour_maps.png)

   
   Untuk skala besar, model dasar nonlinier ini seringkali diubah menjadi model linier (MILP) untuk mempercepat proses optimasi. Proses modifikasi model ini disebut *linearisasi* dan seringkali memerlukan penyesuaian yang cermat agar hasilnya tetap akurat dan relevan.


Baik pendekatan expert judgment, analitis, maupun optimasi matematis memiliki kelebihan dan kekurangan masing-masing, tergantung pada karakteristik suku cadang, biaya persediaan, dan kebijakan perusahaan. Menggunakan metode apapun, kriteria utama dalam menentukan kebijakan persediaan yang optimal adalah memastikan *service level* yang baik, efisiensi biaya persediaan, dan ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat. Selain itu, perusahaan juga perlu mempertimbangkan aspek stokastik dari permintaan, biaya persediaan, dan kebijakan perusahaan, untuk memastikan kebijakan persediaan yang optimal dan berkelanjutan. 

Gambar berikut menunjukkan contoh hasil evaluasi kebijakan persediaan berdasarkan metrik biaya total, biaya penyimpanan, biaya pemesanan, dan biaya kekurangan stok dari tiga kebijakan persediaan yang berbeda yang diperoleh dari berbagai pendekatan. Evaluasi yang dilakukan menggunakan simulasi stokastik dengan 100 set data permintaan yang berbeda.

| Kebijakan Persediaan | Service Level | Total Biaya| Biaya Penyimpanan | Biaya Pemesanan | Biaya Stockout |
|----------------------|---------------|-------------|-------------------|-----------------|------------------|
| (s=13, Q=4)         | 91.6% $\pm$ 2.1% | 328.3 $\pm$ 78.0 | 20.2 $\pm$ 1.6 | 2.1 $\pm$ 0.1 | 306.0 $\pm$ 78.5 |
| (s=25, Q=6)         | 99.9% $\pm$ 0.2% | 41.6 $\pm$ 7.7 | 36.2 $\pm$ 1.7 | 1.7 $\pm$ 0.1 | 3.7 $\pm$ 8.2 |
| (R=7, S=30)         | 99.9% $\pm$ 0.3% | 42.6 $\pm$ 9.5 | 35.6 $\pm$ 1.8 | 2.2 $\pm$ 0.0 | 4.8 $\pm$ 10.2 |

*Semua biaya dalam (juta Rupiah)

![Policy Metrics](/assets/courses/inv-ctrl/policy_metrics.png)

Dari hasil evaluasi tersebut, terlihat bahwa kebijakan persediaan $(s=25, Q=6)$ memberikan hasil yang paling baik, dengan service level 99.9% dan total biaya persediaan yang paling rendah. Hal ini menunjukkan bahwa pendekatan optimasi matematis dapat memberikan hasil yang lebih baik dibandingkan dengan pendekatan analitis atau expert judgment, terutama untuk suku cadang yang permintaannya stokastik dan biaya persediaan yang kompleks. Kebijakan $(R=7, S=30)$ juga memberikan hasil yang baik, namun biaya stockout (dan variasinya) yang lebih tinggi menunjukkan bahwa risiko stockout masih cukup tinggi. Kebijakan hasil EOQ $(s=13, Q=4)$ memberikan hasil yang paling buruk, dengan service level yang rendah dan total biaya persediaan yang tinggi. Ini mungkin disebabkan oleh asumsi model EOQ yang tidak memperhitungkan stokastisitas permintaan dan biaya persediaan dengan pola permintaan suku cadang yang bersifat intermitten.


### Suku Cadang Kritis dan Non-Kritis

Dalam pengelolaan suku cadang, seringkali suku cadang dikelompokkan menjadi suku cadang kritis dan non-kritis. Suku cadang kritis adalah suku cadang yang sangat penting dan vital untuk operasi perusahaan, sehingga kekurangan stok suku cadang ini dapat menyebabkan gangguan serius dalam operasi perusahaan. Suku cadang non-kritis adalah suku cadang yang dapat digantikan atau diganti dengan suku cadang lain, sehingga kekurangan stok suku cadang ini tidak akan berdampak serius pada operasi perusahaan.

Strategi pengelolaan persediaan suku cadang kritis dan non-kritis dapat berbeda, tergantung pada karakteristik suku cadang, biaya persediaan, dan kebijakan perusahaan. Beberapa strategi umum yang dapat digunakan dalam pengelolaan suku cadang adalah:

1. **Pengendalian Persediaan Terpusat vs. Terdesentralisasi**: Pengendalian persediaan suku cadang secara terpusat dapat membantu perusahaan mengurangi biaya persediaan dan meningkatkan efisiensi pengelolaan persediaan. Pengendalian persediaan terpusat memungkinkan perusahaan untuk mengelola persediaan suku cadang secara lebih efektif dan efisien, terutama untuk suku cadang kritis yang sangat penting untuk operasi perusahaan.

2. **Vendor-Managed Inventory (VMI)**: Persediaan suku cadang dikelola langsung oleh vendor, bukan oleh pembeli. Pendekatan ini memungkinkan vendor untuk mengelola persediaan suku cadang secara lebih efektif dan efisien, terutama untuk suku cadang non-kritis yang dapat digantikan atau diganti dengan suku cadang lain.

3. **Consignment Inventory**: Vendor memiliki persediaan suku cadang sampai digunakan. Pendekatan ini memungkinkan vendor untuk memiliki kontrol yang lebih besar atas persediaan suku cadang, terutama untuk suku cadang kritis yang sangat penting untuk operasi perusahaan.

4. **Just-in-Time (JIT) Inventory**: Persediaan suku cadang dikirimkan saat diperlukan. Pendekatan ini memungkinkan perusahaan untuk mengurangi biaya persediaan dan meningkatkan efisiensi pengelolaan persediaan, terutama untuk suku cadang non-kritis yang dapat digantikan atau diganti dengan suku cadang lain.

5. **Collaborative Planning, Forecasting, and Replenishment (CPFR)**: Vendor dan pembeli bekerja sama dalam perencanaan, peramalan, dan pengisian ulang persediaan. Pendekatan ini memungkinkan vendor dan pembeli untuk bekerja sama dalam perencanaan, peramalan, dan pengisian ulang persediaan, terutama untuk suku cadang kritis yang sangat penting untuk operasi perusahaan.

Strategi-strategi ini dapat membantu perusahaan dalam mengelola persediaan suku cadang secara lebih efektif dan efisien, terutama untuk suku cadang kritis yang sangat penting untuk operasi perusahaan. Dengan menggunakan strategi-strategi ini, perusahaan dapat memastikan ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat, sehingga operasi perusahaan dapat berjalan dengan lancar dan efisien.


### Kesimpulan

Dalam pengelolaan suku cadang, terdapat beberapa pendekatan yang dapat digunakan untuk menentukan kebijakan persediaan yang optimal, tergantung pada karakteristik suku cadang, biaya persediaan, dan kebijakan perusahaan. Pendekatan expert judgment, analitis, dan optimasi matematis memiliki kelebihan dan kekurangan masing-masing, tergantung pada kompleksitas suku cadang dan biaya persediaan. Dalam menentukan kebijakan persediaan yang optimal, perusahaan perlu memastikan *service level* yang baik, efisiensi biaya persediaan, dan ketersediaan suku cadang yang tepat, pada waktu yang tepat, dan dalam jumlah yang tepat.

Dengan menggunakan pendekatan yang tepat, perusahaan dapat mengoptimalkan kebijakan persediaan suku cadang, sehingga dapat meningkatkan efisiensi operasi, mengurangi biaya persediaan, dan meningkatkan kepuasan pelanggan. Dengan demikian, pengelolaan persediaan suku cadang yang baik akan membantu perusahaan untuk mencapai tujuan bisnisnya, meningkatkan daya saing, dan mencapai keberlanjutan jangka panjang.



### Kuis Singkat #3 (Ungraded)

**Silakan evaluasi pemahaman Anda dengan menjawab pertanyaan berikut:**

{% for quiz in site.data.quiz_inv_ctrl_3 %}
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