import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Camera, CameraOptions, DestinationType } from '@ionic-native/camera/ngx';
import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  capturedSnapURL:string;
  cameraOptions:CameraOptions={
    quality:20,
    destinationType : this.camera.DestinationType.DATA_URL,
  encodingType:this.camera.EncodingType.JPEG,
  mediaType:this.camera.MediaType.PICTURE

  };

  constructor(private camera:Camera, private localNotifications:LocalNotifications, private alertCtrl:AlertController,
    private plt:Platform) {
      this.plt.ready().then(()=>{
        this.localNotifications.on('click').subscribe(res=>{

          let message= res.data?res.data.mydata:'';
          this.showalert(res.title,message);
        });

        this.localNotifications.on('trigger').subscribe(res=>{

          let message= res.data?res.data.mydata:'';
          this.showalert(res.title,message);
        });

      })


    }
  take_picture()
  {
this.camera.getPicture(this.cameraOptions).then((imageData)=>{
  alert('snapped!');
let base64Image = 'data:image/jpeg;base64,'+imageData
this.capturedSnapURL=base64Image;
}).catch((err)=> {
  alert(err);
  console.log(err);
});
  }

  notification_1(){
 
    this.localNotifications.schedule({
    id:20,
    title:'10 seconds Notification',
    text:'some message',
    trigger:{in: 10, unit: ELocalNotificationTriggerUnit.SECOND}
    });

  }

  notification_2(){

    
  }

  notification_3(){
    this.localNotifications.schedule({
      id:20,
      title:'20 seconds Notification',
      text:'some message',
      trigger:{in:10,every: ELocalNotificationTriggerUnit.SECOND }
      });

    
  }

  showalert(title,mesg)
  {
    this.alertCtrl.create({

      header: title,
      message:mesg,
      buttons:['ok']

    }).then(alert=>alert.present());
  }

}
