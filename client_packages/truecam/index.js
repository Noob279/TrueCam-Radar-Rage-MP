let show = null, browser = null;
let camera, player = mp.players.local;



mp.keys.bind(0x45, false, function () { //e 
  let currentWeapon = player.weapon;
  if(!show) {  
    if(!browser && !player.vehicle && currentWeapon == 3696079510) { //weapon_marksmanpistol
      mp.gui.chat.push(String(player.weapon))
      camera = mp.cameras.new("gameplay");
      camera.setActive(true);
      mp.game.player.setCanDoDriveBy(false);
	    mp.events.add('render', camCheck);

      browser = mp.browsers.new("package://truecam/index.html");
      show = true;
    }   
  }

  else {   

	  mp.events.remove('render', camCheck);

      if (camera) {
        camera.destroy(true);
        camera = null;
      }
    
    browser.destroy();
    browser = null;
    show = null;
  }
})

function camCheck() {
  if (player.weapon != 2725352035) {
    mp.game.controls.disableControlAction(2, 24, true);
    mp.game.controls.disableControlAction(2, 257, true);
  }
  
  if (player.vehicle) return mp.game.graphics.notify('~r~You are in car!');
  
	if (!mp.game.invoke('0x68EDDA28A5976D07')) return; //IsAimCamActive
	

	  const distance = 300;

    let position = camera.getCoord();

    let direction = camera.getDirection(); 

    let farAway = new mp.Vector3((direction.x * distance) + (position.x), (direction.y * distance) + (position.y), (direction.z * distance) + (position.z)); 

    let result = mp.raycasting.testPointToPoint(position, farAway, null, [1,16]);

    if (typeof result === 'undefined') return;
   
      
	  if (result.entity.type == 'vehicle') {
    
		  if (result.entity.getSpeed() !== 0){
        let currentSpeed = result.entity.getSpeed() * 3.6;
     
        let dist =  mp.game.gameplay.getDistanceBetweenCoords(
        position.x,
        position.y,
        position.z,
        result.position.x,
        result.position.y,
        result.position.z,
        true).toFixed(1);
        if (dist < 200) {
          browser.execute(`update(${currentSpeed.toFixed(0)}, ${dist});`);
        } else {
          browser.execute(`update(0, 'too far');`);
        }      
      }  
    }
 
}



