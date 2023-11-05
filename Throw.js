AFRAME.registerComponent("bowling-balls", {

    init : function(){

        this.throwBalls();

    },

    throwBalls : function(){

        window.addEventListener("keydown", (e)=>{
            if (e.key === "z"){
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry", {primitive : "sphere", radius : "0.3"});
                ball.setAttribute("material", {color : "white"});
                ball.setAttribute("dynamic-body", {shape : "sphere", mass : "10"});
                ball.addEventListener("collide", this.removeBall);

                var cam = document.querySelector("#camera");

                var pos = cam.getAttribute("position");
                ball.setAttribute("position", {x : pos.x, y : pos.y, z : pos.z});

                var camera = document.querySelector("#camera").object3D;
                
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                ball.setAttribute("velocity", direction.multiplyScalar(-10));

                var scene = document.querySelector("#scene");
                scene.appendChild(ball);
            }
        })

    },

    removeBall : function(e){

        var element = e.detail.target.el;
        var elementHit = e.detail.body.el;

        if (elementHit.id.includes("pins")){
            var impulse = new CANNON.Vector3(0, 0, 0)
            var worldPoint = new CANNON.Vector3().copy(
                elementHit.getAttribute("position")
            )

            elementHit.body.applyForce(impulse, worldPoint);
            element.removeEventListener("collide", this.removeBall);

            var scene = document.querySelector("#scene");
            scene.removeChild(element);
        }

    }

})