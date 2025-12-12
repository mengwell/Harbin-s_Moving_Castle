!!!--------------------Wecomle to Harbin's moving castle--------------------!!!



1.	Introduction
Based on a simple scene model (https://www.bilibili.com/video/BV1wT4y1V7s4/?spm_id_from=333.337.search-card.all.click&vd_source=6df04cee543c3cd18c1bd6e3b61c1df5), we removed some elements to build a basic environment and based on this we realized a 3D environment with multiple rooms and dynamic elements. The environment includes a robot model that moves freely with arm and leg swings, dynamic wall art switching, a snowman bouncing, an interactive camera system, a transparent ceiling, dynamic reflections in mirrors, a snowflake particle system, and a cube that moves freely along predefined path points. The program uses a variety of user inputs to control the camera view, robot movement, snowman bouncing, and other interactive features such as global lighting and dimming. 



2.	Members
	Yiting Mao 
	Meng Xu 
	Yingtan Ji 
	Zhexun Huang 



3.	Function we have realized
	Dynamic texture – Yiting Mao
	Animated Objects (Bouncing Snowman) – Meng Xu
	Transparent ceiling – Yiting Mao & Meng Xu
	Mirror reflections – Yingtan Ji
	Walking robot – Yingtan Ji (Direction) 
	Walking robot and appearance - Zhexun Huang (arms & feet swing)
	The third perspective – Yingtan Ji
	The transformation of the third perspective and the first perspective - Meng Xu & Yiting Mao
	Lighting – Meng Xu
	Flying – Zhexun Huang



4.	Usage
	We can press Esc to quit
	We can press 'W'|'w' to move camera & robot & robot's legs & robot's arms forward.
	We can press 'S'|'s' to move camera & robot & robot's legs & robot's arms backward.
	We can press 'A'|'a' to move camera & robot leftward.
	We can press 'D'|'d' to camera & robot move rightward.
	We can press 'F'|'f' to move camera upward.
	We can press 'V'|'v' to move camera downward.
	We can press 'C'|'c' to switch to the third perspective.
	We can press 'P'|'p' to turn global light off.
	We can press 'L'|'l' to turn global light on.
	We can press 'sapce' to move to bounce snowman upward and downward.



5.	Details of individual tasks
	Basic Room View (Yiting Mao): 
Since our project is based on an existing project on the internet, we are going to change the code to what we need it to be. For example, in the original code, the room is built based on the combination of scaled cubic. However, we wanted to be able to look down on the house from the roof, so we delete all current cubics, and rebuilt the house and the walls with flat rectangles. Meanwhile, I deleted all the decorations from the original scene, such as the toilet, sofa, etc. Overall, we only followed the framework of the original code and kept its floors.

	Dynamic Texture (Yiting Mao): 
I implement dynamic texturing primarily by periodically switching texture indices from a set of textures. Initially, I define a vector called wallPaintings in the code, which contains multiple texture names corresponding to different texture resources. Additionally, there is an integer variable currentWallPaintingIndex that serves as the index for the current texture. In the Render() function, I use the glfwGetTime() function to fetch the current time and compare it with the last texture change time stored in lastWallChangeTime. If the interval exceeds 3 seconds, I update currentWallPaintingIndex to point to the next texture and reset lastWallChangeTime. When rendering related objects, I retrieve the current texture name from the wallPaintings vector using currentWallPaintingIndex and use this texture for rendering.

	Transparent Ceiling (Yiting Mao, Meng Xu):
Because we wanted to see the room's layout from a top-down view, we made the ceiling transparent. First, we modified Graphic.frag so that its main function sets FragColor based on the value of useTexture. Specifically, if useTexture is true, the texture is used to ensure normal drawing, such as walls. The texture(image, TexCoords) function returns the texture color at the TexCoords position and assigns it to FragColor. If useTexture is false, spriteColor is used. The function vec4(spriteColor, 0.5) converts spriteColor to a four-dimensional vector, where the first three components are color values and the fourth component is the alpha value (0.5), making the roof transparent. Next, we wrote a new function in Graphic.cpp called DrawRectangle. It is similar to the existing DrawSprite, applying a series of transformations (translation, rotation, and scaling) to set the rectangle's model matrix and configuring the shader to draw the rectangle. The only difference is that in this function, we set useTexture to 0 using shader.SetInteger. Finally, in the render function, we call DrawRectangle with the color set to glm::vec3(1.0f, 1.0f, 1.0f), achieving a transparent white ceiling.

	Flying (Zhexun Huang):
Because we want to see the layout of the room from a top-down view, we set the ceiling to be semi-transparent white. First, we defined the robotPosition variable to represent the position of the robot. In the processInput function, we set it so that when the F key is pressed, the robot's position increases along the y-axis, achieving an upward movement; when the V key is pressed, the robot's position decreases along the y-axis, achieving a downward movement. Then, in the render function, we use the updated robotPosition to draw the robot, achieving the functionality of flying in the 3D space.

	Robot performance (Zhexun Huang):
After the previous student completed the transformation between the first-person and third-person perspectives, he did not create a robot composed of multiple shapes, but rather replaced it with a single cube. Therefore, I have re-used glm::translate and glm::scale to set the positions and sizes of the various components of the robot. I use the Renderer->DrawSprite method to draw, passing in parameters such as the texture, position, and size of the body.

	Waving legs and arms (Zhexun Huang):
To make the robot appear less rigid and more human-like in its movements, I've implemented arm and leg swinging during its walking motion. Initially, I defined variables for the angles of the arms and legs, such as right_arm_angle, left_arm_angle, right_leg_angle, and left_leg_angle. These variables store the current swing angles of the arms and legs. Then, the isWalking variable is used to determine whether the robot is currently walking. The arms and legs only swing if isWalking is set to true. For the swinging logic, I use the updateArmAngles() function to update the swing angles of the arms and legs. This function checks the isWalking state, and if the robot is walking, it adjusts the swing direction (forward or backward) based on the isArmSwingForward flag. The speed of the swing is controlled by swingSpeed, and the maximum angle of swing is defined by maxSwingAngle. In updateArmAngles(), I increase or decrease the angle values based on the truth value of isArmSwingForward. When the maximum swing angle is reached, isArmSwingForward is toggled to swing the arms and legs in the opposite direction. Furthermore, in the DrawRobot() function where the robot is rendered, I apply glm::rotate() to the right_arm_angle, left_arm_angle, right_leg_angle, and left_leg_angle to the robot's arm and leg models. This rotation, based on the current angle values, achieves dynamic swinging effects for the arms and legs.

	Mirror Reflection (Yingtan Ji):
To achieve the mirror reflection functionality, we placed a mirror on the wall. First, in the Init function, I created and configured a framebuffer object mirrorFBO and a texture mirrorTexture using glGenFramebuffers and glGenTextures, which are used to store the mirror reflection image. Then, in the RenderToMirror function, I switched the rendering target to mirrorFBO and performed the rendering of the reflected image in it. We bound the texture to mirrorFBO so that the rendering operations' results could be stored in this texture. I also set up the view matrix for reflection and rendered the scene to the mirror texture. In the final rendering, I drew the mirror texture to the screen to achieve the mirror reflection effect.

	The transformation of the third perspective and the first perspective（Yingtan Ji）:
We want our third-person view camera to be fixed behind and above the robot, while the first-person view camera should have its position coincide with the robot's position, maintaining the same view direction. To achieve this, I first added a new function, SwitchToThirdPerson, in camera.cpp. I introduced a logical variable, isThirdPerson, to determine whether the current view is third-person. Then, I set the camera position to the target position and added a predefined offset, thirdPersonOffset. This offset determines the camera's position relative to the robot in third-person view. Finally, I called the UpdateCameraVectors function to update the camera's direction vectors, ensuring the view direction is correct after switching perspectives. In the Render function, I set the view matrix based on the camera's perspective state. If it is in third-person view, the camera follows the robot; otherwise, the camera position coincides with the robot's position, achieving the first-person view. Lastly, in the processInput function, I enabled the C key to control the switching between third-person and first-person views.

	Ensure that the robot's legs always stay on the ground while walking (Yingtan Ji):
In the processInput function, when the W or S key is pressed, the robot's position is updated, which causes the robot to move up and down and become unstable while walking. Therefore, I always set the robot's position's y-axis value to camera.groundHeight, ensuring that the robot stays on the ground while moving.

	Allow the Robot to Turn Using the Mouse (Yingtan Ji):
To allow the robot to turn using the mouse, we implemented a mouse movement handling function ProcessMouseMovement in the Camera class. This function captures the mouse movement and adjusts the robot's orientation angles (Pitch and Yaw) accordingly. When the mouse moves, the camera updates the robot's view direction and recalculates the camera's direction vectors using the UpdateCameraVectors function.
Specific implementation steps are as follows:
1.Capture Mouse Movement: In the mouse_callback function, capture mouse movement events and calculate the mouse movement (deltaX and deltaY).
2.Handle Mouse Movement: Call the ProcessMouseMovement function in the Camera class, passing the mouse movement to update the camera's orientation angles (Pitch and Yaw).
3.Update View Direction: In the ProcessMouseMovement function, recalculate the camera's direction vectors based on the new Pitch and Yaw values to ensure the camera's view direction aligns with the mouse movement.
Through these steps, we achieved mouse-controlled robot view direction adjustments, allowing it to look up, down, left, and right.

	Bouncing Snowman (Meng Xu):
In the original code, the snowman is stationary. I wanted the snowman to have a bouncing effect, so I achieved this by modifying the 'y' coordinate. First, I defined a variable 'bounce', which calculates the offset for the bounce based on the periodic changes of the 'sin' function, the bounce height, the bounce frequency, and the glfwGetTime function. Then, I added the 'bounce' value to the snowman's 'y' axis coordinate and controlled whether the snowman bounces based on the state of the spacebar key.

	Lighting (Meng Xu): 
In the original scene, only the lights inside the house and the streetlights outside were on. I wanted to achieve an effect where the entire scene can globally darken and brighten at any time. After learning that using different shaders with different lighting logic can change the overall lighting effect of the scene, I switched between different shaders in response to different key events to achieve this functionality.

	Automatic track following (Meng Xu, Yiting Mao)：
First, we defined a series of waypoints and variables in the code to store the cube's current position, initialized to the first point in the path list, the index of the cube's current target waypoint, and an interpolation function to calculate the linear interpolation of the cube from its current position to the target position for smooth movement. Then, we defined the updateCubePosition function to compute the direction between the current position and the target position, and update the cube's position according to the defined speed. When the cube is close enough to the target point, we update the target point index to the next point or loop back to the beginning of the path. The updateCubePosition function is called in the rendering loop, passing in the time delta deltaTime to calculate position updates based on the frame rate.



6.	Difficulties we have met
	The first-person perspective was trapped inside the robot. (Yingtan Ji)
	Step1. Define an Offset for the Camera:
	Determine an appropriate offset for the camera relative to the robot's position to ensure the camera is positioned slightly above or behind the robot. This offset prevents the camera from being inside the robot and improves the visual experience in first-person mode.
	Step2. Apply the Offset in First-Person Mode:
	Whenever the camera's position is updated in first-person mode, ensure that the defined offset is applied to the robot's position. This adjustment positions the camera correctly relative to the robot, avoiding the issue of being trapped inside.
	Step3. Consistently Update the Camera's Position:
	In the input processing and movement handling functions, update the camera's position by adding the offset to the robot's position. This ensures the camera follows the robot's movements while maintaining the correct position and perspective.
	Step4. Adjust Camera Orientation:
	Ensure that the camera's orientation is updated correctly based on the robot's direction. This involves recalculating the camera's direction vectors to match the robot's orientation, providing a consistent first-person view aligned with the robot's movements.
	Step5. Test and Refine:
	Test the adjusted camera position in various scenarios, such as moving forward, backward, and turning, to ensure the first-person perspective remains outside the robot and provides a clear view.
Refine the offset values and position updates as needed based on the testing results.

	The robot left the ground when walking. (Yingtan Ji)
	Step 1: Define the Ground Height
	Determine the ground height where the robot should remain during movement. This can be set as a constant or retrieved from the initial position of the robot.
	Step 2: Update Horizontal Movement
	When handling input for robot movement (e.g., moving forward, backward, left, or right), update only the horizontal components (x and z) of the robot's position.
	Step 3: Apply Ground Height Consistently
	After updating the robot's position based on input, explicitly set the vertical component (y-coordinate) of the robot's position to the ground height. This ensures that the robot's vertical position does not change during movement.

	Issues with the rendering settings of the mirror caused no reflection to be visible in the mirror. (Yingtan Ji)
	Step 1: Setup the Framebuffer Object (FBO)
	Create a framebuffer object and a texture to store the reflection image.
	Attach the texture to the framebuffer's color attachment.
	Ensure a depth buffer is attached to handle depth testing.
	Step 2: Modify the View Matrix for Reflection
	Flip the view matrix along the z-axis (or the axis perpendicular to the mirror) to simulate reflection. This involves scaling the z component of the view matrix by -1.
	Step 3: Render the Scene to the Mirror FBO
	Bind the mirror FBO and set the viewport to match the dimensions of the reflection texture.
	Clear the framebuffer and render the scene using the modified view matrix.
	Unbind the FBO after rendering.
	Step 4: Render the Mirror Surface with the Reflection Texture
	In the main rendering loop, bind the reflection texture and render the mirror surface.
	Use appropriate shaders to map the reflection texture onto the mirror geometry.

	Scene brightness single switch control issue (Meng Xu)
	After realizing the global scene lighten function, when I want to press a key to realize the global scene darken function, I found that it can only be darkened by long press, and once I cancel the key, it will be lightened. I want to realize one click to lighten or darken, so I added different shaders in different key handling events to solve the problem.

	Snowman bouncing control issues (Meng Xu)
	When implementing the snowman bouncing function, the snowman initially bounces over time, but because of this the snowman does not stop bouncing. In order to allow the snowman to start and stop bouncing according to the user's input, I added a code that detects the state of the spacebar and a variable that records the bouncing state of the snowman, and toggles the state of the variable when the spacebar is pressed in order to start or stop the snowman's bouncing action.

	Automatic trajectory path point cyclic control problem (Meng Xu)
	In the auto-tracing function, based on this scenario, it is very complicated to define a series of path points, inaccurate path points can cause the cube's movement to go through walls or even disappear out of the scene. Furthermore, in the implementation of the updateCubePosition function, we have added the ability to determine if the cube has reached the target position. However, we observed that the cube would suddenly disappear after passing through a series of predefined path points. To solve this problem, we decided to introduce a looping mechanism. That is, when the cube reaches the last point in the path list, the start point of the path is reset to the next target point, thus cycling the cube's movement to ensure that it remains visible in the scene and follows the desired path.

	Robot Walking State Control Problem (Zhexun Huang)
	When implementing the robot walking function, we encountered a problem: when pressing the 'W' key, the robot's arm swinging motion was not rendered in Windows, even though the program did not report an error and the camera could move normally. To solve this problem, we thought that there might be a conflict in the code logic.
	For this reason, we introduced a global variable isWalking, which is used to clarify whether the robot is currently walking or not. On detecting the 'W' key being pressed, we set isWalking to true, which triggers the walking state. Immediately after processing the camera position update in the processInput method, we update the arm angle at the same time.
	This approach allowed us to ensure that both the camera movement and the robot's arm swing were correctly reflected in the interface while keeping the code clear and logical. We then successfully implemented robot leg angle updates as well.

	Robot Walking Logic Conflict Problem
	Similarly, while implementing the walking function for the robot, we encountered an issue where, despite calling the global variable isWalking in the processInput method, defining the robot's forward and backward movement led to problems. Specifically, after defining the 'W' key press and setting isWalking to false when the 'W' key is not pressed, the robot's arm movement was not displayed in Windows when the 'S' key was pressed. We determined that this was due to the 'if-else-if' code structure. We modified the code to 'if(W) - else if (S) - else(isWalking = false)' and successfully displayed the robot's arm movement and updated the isWalking state.

	Transparent ceiling realization problems (Yiting Mao & Meng Xu)
	During the implementation of the transparent ceiling, we recognize that we need the RBGA method to pass in A to define the transparency, but we don't have any RGBA methods in our code, it's all RGB methods. So we look in the file 'Graphic.frag' and change the code in the main function to:

if (useTexture)
       		FragColor = texture(image, TexCoords);
   		else
FragColor = vec4(spriteColor, 0.5);

	to help us determine whether we need to go through texture or not. In addition, since we don't have a render method in our graphic.cpp file that doesn't need to be textured, we define our own 'GraphicRenderer::DrawRectangle' method and change the code in it. So we define our own 'GraphicRenderer::DrawRectangle' method and change the code in it to:

this->shader.SetInteger("useTexture", 0);  // Disable texture

	Set "useTexture" to 0 to disable texture, and finally we use this method to define the ceiling and pass in the color glm::vec3(1.0f, 1.0f, 1.0f) and enable the blend and set the blend function to achieve a transparent ceiling.

	Transparent Ceiling Depth Write Control Issues (Yiting Mao & Meng Xu)
	After we implemented transparent ceilings we found that we could not see inside the house. We found out that we need to disable depth writing first, and then revert to depth writing after we implement the transparent ceiling to see what's going on in the house and the moving cubes.




