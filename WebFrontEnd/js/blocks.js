var BlockID = {
    BasicFandC: 0,
    BasicBlock: 1,
    Punch: 2,
    Pillar: 3
};

function makeBlock(id, px, pz) {
    if (id < 0) return;
    switch (id) {
    case BlockID.BasicFandC: //BasicFloor & BasicCeiling
        //addGameObject(new BasicFloor(px, pz));
        if (pz == randomInt(0, 20)) {
            addGameObject(new SlopeFloor(px, pz));
            addGameObject(new SimpleEntity(px, pz));
            addGameObject(new BasicFloor(px, pz));
        } else {
            addGameObject(new BasicFloor(px, pz));
            addGameObject(new BasicCeiling(px, pz));
        }
        //addGameObject(new BasicCeiling(px, pz));
        break;
    case BlockID.BasicBlock: //BasicBlock
        addGameObject(new BasicBlock(px, pz));
        break;
    case BlockID.Punch: //PunchBlock
        addGameObject(new PunchBlock(px, pz));
        break;
    case BlockID.Pillar: //Pillar
        addGameObject(new PillarBlock(px, pz));
        addGameObject(new BasicFloor(px, pz));
        addGameObject(new BasicCeiling(px, pz));
        break;
    }
}

function makeSpawn(px, pz) {
    _C.position.set(px, player.y, pz);
}

function killGameObject(it) {
    _S.remove(it.obj);
    gameObjects.splice(gameObjects.indexOf(it), 1);
}

function Block(px, pz) {
    this.x = px;
    this.z = pz;
    this.needsUpdate = false;
    this.update = function () {}
}

function SlopeFloor(px, pz) {
    this.obj = new THREE.Mesh(new THREE.PlaneGeometry(1, Math.sqrt(2)), new THREE.MeshBasicMaterial({
        color: '#E91E63',
        side: THREE.DoubleSide
    }));
    this.obj.position.set(px, 0, pz);
    this.obj.rotation.x = Math.PI / 4;
    this.obj.rotation.y = (Math.PI / 2) * randomInt(0, 3);
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.rotateEnabled = false;
    this.obj.selected = function () {
        if (this.rotateEnabled) {
            this.rotateEnabled = false;
        } else {
            this.rotateEnabled = true;
        }
    }
    this.needsUpdate = true;
    this.obj.collidable = true;
    this.rayEnabled = true;
    this.update = function () {
        if (this.obj.rotateEnabled) this.obj.rotation.y += (Math.random() / 200) * DELTA;
    }
}

function BasicFloor(px, pz) {
    //var x = Math.round(Math.abs((128 * Math.sin(px / 10) + 128 * Math.cos(pz / 10))));
    this.obj = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
        color: '#4CAF50',
        side: THREE.DoubleSide
    }));
    this.obj.position.set(px, -0.5, pz);
    this.obj.rotation.x = -Math.PI / 2;
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.selected = function () {
        if (!this.material.wireframe) {
            this.collidable = false;
            this.material.wireframe = true;
        } else {
            this.collidable = true;
            this.material.wireframe = false;
        }
    }
    this.needsUpdate = false;
    this.rayEnabled = true;
    this.obj.collidable = true;
    this.update = function () {
        /*if(Math.sqrt(Math.pow((this.obj.position.x-_C.position.x),2)+Math.pow((this.obj.position.z-_C.position.z),2))<0.5){
        	this.obj.material.color.r = Math.random();
        	this.obj.material.color.g = Math.random();
        	this.obj.material.color.b = Math.random();
        }//*/
    }
}

function BasicCeiling(px, pz) {
    //var x = Math.round(Math.abs((128 * Math.sin(px / 10) + 128 * Math.cos(pz / 10))));
    this.obj = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
        color: '#607D8B',
        side: THREE.DoubleSide
    }));
    this.obj.position.set(px, 0.5, pz);
    this.obj.rotation.x = -Math.PI / 2;
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.selected = function () {
        if (!this.material.wireframe) {
            this.collidable = false;
            this.material.wireframe = true;
        } else {
            this.collidable = true;
            this.material.wireframe = false;
        }
    }
    this.needsUpdate = false;
    this.obj.collidable = true;
    this.rayEnabled = true;
    this.update = function () {}
}

function BasicBlock(px, pz) {
    //var x = Math.round(Math.abs((128 * Math.sin(px / 11) + 128 * Math.cos(pz / 11))));
    var colorCorrection = 158 + randomInt(-5, 5);
    this.obj = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 'rgb(' + colorCorrection + ',' + colorCorrection + ',' + colorCorrection + ')'
    }));
    this.obj.position.set(px, 0, pz);
    this.obj.alive = true;
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.selected = function () {
        if (!this.material.wireframe) {
            this.collidable = false;
            this.material.wireframe = true;
        } else {
            this.collidable = true;
            this.material.wireframe = false;
        }
    }
    this.needsUpdate = true;
    this.obj.collidable = true;
    this.rayEnabled = true;
    this.update = function () {
        //if(!this.obj.alive) killGameObject(this);
        //this.obj.rotation.x+=(Math.random()/100)*DELTA;
        //this.obj.rotation.y+=(Math.random()/100)*DELTA;
        //this.obj.rotation.z+=(Math.random()/100)*DELTA;
        /*if(Math.sqrt(Math.pow((this.obj.position.x-_C.position.x),2)+Math.pow((this.obj.position.z-_C.position.z),2))<1){
        	killGameObject(this);
        }//*/
    }
}

function PillarBlock(px, pz) {
    this.obj = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1, 0.5), new THREE.MeshBasicMaterial({
        color: 0x989898
    }));
    this.obj.position.set(px, 0, pz);
    this.obj.alive = true;
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.rotateEnabled = false;
    this.obj.selected = function () {
        if (this.rotateEnabled) {
            this.rotateEnabled = false;
        } else {
            this.rotateEnabled = true;
        }
    }
    this.needsUpdate = true;
    this.obj.collidable = true;
    this.rayEnabled = true;
    this.update = function () {
        if (this.obj.rotateEnabled) this.obj.rotation.y += (Math.random() / 100) * DELTA;
    }
}

function PunchBlock(px, pz) {
    this.obj = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({
        color: 0x808080
    }));
    this.obj.position.set(px, 0, pz);
    this.obj.alive = true;
    this.obj.health = randomInt(1, 5);
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.selected = function () {
        this.health--;
        this.material.color.g -= Math.random() / 10;
        this.material.color.b -= Math.random() / 10;
        if (this.health == 0) {
            this.alive = false;
            addGameObject(new BasicFloor(px, pz));
            addGameObject(new BasicCeiling(px, pz));
        }
    }
    this.needsUpdate = true;
    this.obj.collidable = true;
    this.rayEnabled = true;
    this.update = function () {
        if (!this.obj.alive) killGameObject(this);
        distanceFromPlayer = Math.sqrt(Math.pow((this.obj.position.x - _C.position.x), 2) + Math.pow((this.obj.position.z - _C.position.z), 2));
        if (distanceFromPlayer < RENDER_DISTANCE) {
            this.obj.material.color.b = 1 - (distanceFromPlayer / 10);
        }
    }
}

function SimpleEntity(px, pz) {
    this.obj = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({
        color: 0xFF5722
    }));
    this.obj.position.set(px, 0, pz);
    this.obj.alive = true;
    _S.add(this.obj);
    this.obj.rotation.order = "YXZ";
    this.obj.rotateEnabled = false;
    this.obj.selected = function () {}
    this.needsUpdate = true;
    this.obj.collidable = true;
    this.rayEnabled = true;
    this.update = function () {
        this.obj.rotation.y += (Math.random() / 100) * DELTA;
    }
}