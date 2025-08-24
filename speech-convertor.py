import tkinter as tk //tkinterı import ettik    (  arayüz kütüphanesi)
from tkinter import *  //tkinter içindeki her şeyi kullanmak için
import pyttsx3 //yazıyı sese çeviren kütüphane

def speaknow():    //speak butonuna basıldığında çalışmasını sağlıyor fonksiyonun
    engine=pyttsx3.init()    //motoru başlatıyor
    engine.say(textv.get())    //metni alıp okunmak üzere motora gönderdi
    engine.runAndWait()  //motor konuşmayı bitene kadar bekledi
    engine.stop()    //sonra durdu
    
root=Tk()    //tkinterın ana penceresi oluştu

textv=StringVar() //tkinter için değişken tipi olışturdu bağlantı kurmak amacıyla

obj=LabelFrame(root,text="Text to speech",font=22,bd=2)    //  üst başlığı oluşturuyor
obj.pack(fill="both",expand="yes",padx=13,pady=13    //fill both tüm alanı kapla,expand yes boş alan varsa çerçeveyi büyüt,padx,pady dış alanlardan boşluk bırak

lbl=Label(obj,text="Text",font=30)  //text yazısı kısmı
lbl.pack(side=tk.LEFT,padx=5)    //sola koy 5 pixel boşlık bırak

text=Entry(obj,textvariable=textv,font=30,width=18,bd=5)  //yazı yazdığımız kutucuk entry’de yazılanı textv değişkenine bağlar,obj adlı labelframein içine eklenir
text.pack(side=tk.LEFT,padx=10)

btn=Button(obj,text="Speak",font=20,bg="black",fg="white",command=speaknow)  //command=speaknow tıklanınca çalışacak fonksiyon
btn.pack(side=tk.LEFT,padx=10)

root.title("text to speech")  //ana başlık
root.geometry("400x200")  //boyut
root.resizable(False,False)  //kullanıcı pencereyi büyütüp küçültemez
root.mainloop() //tkinterın ana döngüsü bu hep lazım
