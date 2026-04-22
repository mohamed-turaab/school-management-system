# Nidaamka Maamulka Iskuulka (School Management System)

Kani waa mashruuc ballaaran oo loogu talagalay in lagu maamulo dhammaan xogta iskuulka, sida ardayda, macalimiinta, iyo natiijooyinka imtixaannada.
Mashruucan waxaa loo dhisay si casri ah, iyadoo la adeegsanayo tignoolajiyada ugu dambeysay ee dhinaca horumarinta webka.
Hoos waxaan si faahfaahsan ugu sharxi doonaa qaabka uu u shaqeeyo dhinaca hore (Frontend), dhinaca dambe (Backend), iyo sida ay xogtu isaga kala gudubto.

### 1.  (Frontend)
Dhinaca hore ee mashruucan waa qaybta ay arkeen dadka isticmaalaya nidaamka maalintii oo dhan.
Waxaa lagu dhisay luuqadaha asaasiga ah ee HTML5, CSS3, iyo JavaScript (ES6+).
HTML-ka waxaa loo adeegsaday in lagu dhiso laf-dhabarta bogga iyo dhammaan sanduubyada xogta lagu qoro.
CSS-kana waxaa loo adeegsaday in bogga laga dhigo mid qurux badan oo indhuhu ku raaxaystaan, iyadoo la adeegsanayo midabo isku habboon.
JavaScript-ka asalka ah (Vanilla JS) ayaa loo adeegsaday in bogga laga dhigo mid firfircoon oo hadba wixii loo baahdo si degdeg ah u qabanaya.
Frontend-ku wuxuu ka kooban yahay bogag dhowr ah oo aad muhiim u ah:
1.  **Dashboard-ka Maamulaha**: Meesha laga arko tirada guud ee ardayda, macalimiinta, iyo dhammaan warbixinnada muhiimka ah.
2.  **Dashboard-ka Macalinka**: Meesha macalinku ka galiyo dhibcaha ardayda, uuna ka hubiyo inta arday ee soo xaadirtay.
3.  **Dashboard-ka Ardayga**: Meesha ardaygu ka arko natiijadiisa imtixaannada iyo fariimaha uga yimaada iskuulka.
4.  **Bogga Login-ka**: Meesha ammaan ah oo qof kasta uu ka galo qaybta uu kaga magacaaban yahay iskuulka.
Muuqaalka nidaamkani wuxuu u shaqeeyaa si la mid ah mobile-ka iyo computer-ka (Responsive Design).
Kani waa mid ka mid ah sifooyinka ugu muhiimsan ee frontend-ka casriga ah maanta.
Wuxuu isticmaalaha siinayaa jawi sahlan oo uu ku dhex mari karo dhammaan qaybaha kala duwan ee websaydhka.

### 2.  (Backend)
Dhinaca dambe waa maskaxda mashruuca ee hageysa dhammaan waxyaabaha gadaal ka dhacaya.
Halkan waxaa ku yaal server-ka oo ah kii fulinayay dhammaan amarrada ka imaanaya dhinaca hore ee websaydhka.
Waxaan u adeegsanay Node.js iyo Express.js si aan u dhisno server awood badan oo u dulqaadan kara culeyska badan.
Backend-ka wuxuu mas'uul ka yahay shaqooyin dhowr ah oo isugu jira kuwo muuqda iyo kuwo qarsoon:
- **Xaqiijinta Ammaanka**: Hubinta in qof kasta oo raba inuu xogta arko uu yahay qof xaq u leh (Authentication & Authorization).
- **Isku xirka Database-ka**: Server-ku wuxuu si toos ah ula hadlaa MongoDB oo ah meesha xogta lagu kaydiyo ee ammaan ah.
- **Maamulka API-yada**: Waa dariiqyada ama mareennada ay xogtu u marto si ay u gaarto frontend-ka gudihiisa.
- **Kaydinta Mudnaanta**: Hubinta in ardaygu uusan beddeli karin dhibcihiisa, balse macalinku kaliya uu taas samayn karo.
Backend-ku waa meesha go'aamada oo dhan laga gaaro, xogtana si hufan loogu habeeyo.

### 3. Sida GET u shaqeyso (Soo bandhigidda Xogta)
Marka aan rabo inaan aragno liiska ardayda ama macluumaadka qof jooga, waxaan isticmaalnaa amarka loo yaqaano GET.
GET waa midka naga caawiya inaan xogta ka soo "akhrisanno" ama aan ka soo "qaadanno" database-ka.
Tusaale ahaan, marka uu maamuluhu soo galo dashboard-ka, frontend-ku wuxuu server-ka u diraa codsi GET ah.
Server-ku markaas wuxuu aadaa MongoDB, wuxuu soo ururiyaa dhammaan magacyada ardayda ku jira database-ka.
Ka dibna wuxuu u soo celiyaa frontend-ka si loogu soo bandhigo jadwallada (Tables) looguna arko si qurux badan.
Shaqadani waxay u dhacdaa ilbiriqsiyo gudahood oo aysan qof isticmaalayaa dareemayn wax daahid ah.
Waa habka ugu badan ee nidaamku u adeegsado inuu xogta ku soo muujiyo bogga hore.

### 4. Sida POST u shaqeyso (Kaydinta Xog Cusub)
Marka aan rabo inaan diwaangelino arday cusub ama aan ku darno natiijo imtixaan, waxaan isticmaalnaa amarka POST.
POST waa ka mas'uulka "dirista" ama "kaydinta" xogta cusub ee la abuurayo ee horay u jirin.
Tusaale ahaan, marka la buuxiyo foomka (Form) ee lagu diwaangelinayo arday cusub laguna riixo badhanka "Submit".
Xogtaas magaca, fasalka, iyo taleefanka ah waxaa lagu soo duubaa qaab JSON ah.
Xogtaas waxaa si degdeg ah loogu diraa backend-ka iyada oo loo marayo codsiga POST-ka.
Server-ka ayaa markaas hubiya haddii ay xogtu dhammaystiran tahay iyo haddii qofka soo diray uu oggolaansho u leeyahay.
Haddii wax walba sax yihiin, server-ku wuxuu ku kaydiyaa MongoDB, wuxuuna noo soo celiyaa fariin guul ah.
GET waa soo qaadasho, POST waa geynta iyo kaydinta xog cusub.

### 5. Sida DELETE u shaqeyso (Tirtirista Xogta)
Haddii la rabo in la tirtiro arday isaga baxay iskuulka ama xog khalad ah, waxaan adeegsanaa amarka DELETE.
DELETE waa habka looga saaro xogta aan loo baahnayn database-ka gudihiisa si aan mar dambe loo arkin.
Marka badhanka tirtirista (Delete Button) la riixo, frontend-ku wuxuu dirayaa codsi DELETE ah.
Codsigan wuxuu wataa aqoonsiga gaarka ah (ID Number) ee qofka ama xogta la rabo in la tirtiro.
Server-ka ayaa markaas samaynaya hubin weyn oo dhinaca ammaanka ah si aan xogta loogu tirtirin si kama' ah.
Haddii la oggolaado shaqadaas, xogtaas si rasmi ah ayaa looga saaraa database-ka MongoDB.
Tani waxay ka dhigan tahay in xogtaas aysan ka muuqan doonin liisaska dambe ee la soo aqrinayo.
Waa amar awood badan oo loo baahan yahay in si taxadar leh loo isticmaalo mar kasta.

---

### Isku-duubnida Mashruuca iyo Sida uu u Shaqeeyo
Mashruucan wuxuu ka kooban yahay in ka badan 100 qaybood oo isku xiran si loo hubiyo in maamulku u socdo si hufan.
Frontend-ka iyo Backend-ku waxay wada hadlaan saacad kasta iyagoo adeegsanaya dariiqyada (Routes) la diyaariyay.
Xogta oo dhan waxay ku kaydsan tahay MongoDB oo ah database aad u ammaan badan oo casri ah.
Isticmaalaha nidaamka wuxuu ku dhex shaqeynayaa jawi qurux badan oo fudud, iyadoo server-ku uu shaqada adaq qabanayo.
Tani waxay ka dhigan tahay in iskuulka looga guuray habkii hore ee warqadaha loona guuray hab digital ah oo hufan.
Xiriir kasta oo dhex mara labada dhinac wuxuu leeyahay hubin ammaan (Security check) oo aad u adag.
Maamuluhu waa qofka ugu awoodda badan ee wax kasta beddeli kara ama tirtiri kara nidaamka dhexdiisa.
Macalimiintu waxay leeyihiin xafiis u gaar ah oo ay xogta casharrada iyo natiijooyinka ku maamulaan.
Ardayduna waxay leeyihiin qayb ay ku eegtaan horumarkooda waxbarasho iyagoon waxba beddeli karin.
Nidaamkan waxaa loo dhisay inuu u adeego tiro kasta oo dad ah, isagoo markasta ilaalinaya xawaarihiisa sare.
Waad ku mahadsan tahay inaad dib u eegis ku sameyso mashruucan maamulka iskuulka ee casriga ah ee heerka sare ah.
Haddii aad u baahato inaad wax ka beddesho ama aad wax ku darto, nidaamku waa mid u furan in la ballaariyo.
Dhammaan qaybaha code-ka waa kuwo si nidaamsan loo qoray si mustaqbalka loogu daro muuqaalo kale.
Waxaan rajaynaynaa in nidaamkani uu isbeddel weyn ku sameeyo habka maamulka waxbarashada iskuulkaaga.
Xusuusnow, tignoolajiyadu waa mida kuu fududeynaysa noloshaada, nidaamkana waa tusaale nool oo taas ah.
Mid kasta oo ka mid ah GET, POST, iyo DELETE waa tiirar muhiim u ah shaqada maalinlaha ah ee websaydhkan.
Haddii mid ka mid ah uu meesha ka baxo, nidaamku ma noqon karo mid dhammaystiran ama mid shaqeynaya.
Sidaas darteed, waxaan u hubinnay mid kasta oo iyaga ka mid ah inay u shaqeeyaan sidii loogu talagalay oo sax ah.
Guul ayaan u rajaynaynaa dhammaan dadka isticmaalaya nidaamkan maamulka iskuulka ee weyn ee awoodda badan.
Kani waana dhamaadka sharaxaadda kooban ee ku saabsan sida uu u shaqeeyo mashruucaaga weyn ee maamulka.
Af-Soomaali fudud ayaan ugu sharaxnay si qof walba oo akhrinaya uu u fahmo mucda iyo nuxurka shaqadan.
Mashruucan wuxuu daboolayaa baahiyo badan oo laga yaabo in iskuulku u baahdo mustaqbalka dhow iyo kan fog.
Waxaan ku darnay qaybo badan oo isugu jira xisaabaadyo iyo diwaangelinno muhiim u ah maareynta Ardayda.
Sidaas darteed, README-gan wuxuu ku siinayaa sawir guud oo ku saabsan sida ay wax u socdaan gudaha iyo dibadda.
Hadaba, ku raaxayso isticmaalka nidaamkan oona ka faa'iideyso awooddiisa weyn ee uu kuu keenay.
Shaqo wanaagsan iyo guul ayaan mar kale idiin rajaynaynaa dhammaantiin, horumar wacan!
Fadlan hubi in xogtaada backend-ka ee .env ay si sax ah ugu xiran tahay database-ka MongoDB meel kasta.
Haddii ay taasi sax tahay, waxaad heli kartaa dhamaan faa'iidooyinka aan kor ku soo xusnay ee GET/POST/DELETE.
Ugu dambayn, websaydhkan wuxuu diyaar u yahay in kor looga qaado tayadiisa markasta oo loo baahdo.
Mahadsanid.
