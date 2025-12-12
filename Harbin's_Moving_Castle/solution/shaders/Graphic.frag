#version 330 core
in vec2 TexCoords;
//out vec4 color;
out vec4 FragColor;

uniform sampler2D image;
uniform vec3 spriteColor;
uniform bool useTexture;



void main()
{
   // color = vec4(spriteColor, 1.0) * texture(image, TexCoords);
   //color =  texture(image, TexCoords);
   //FragColor = spriteColor;
   if (useTexture)
        FragColor = texture(image, TexCoords);
   else
        FragColor = vec4(spriteColor, 0.5);

}



