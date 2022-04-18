using ImageMagick;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace ImageCompression.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageCompressor : ControllerBase
    {
        private static Random random = new Random();

        private void temp(string path)
        {
            var settings = new MagickReadSettings();
            settings.Width = 800;
            settings.Height = 600;

            using (var memStream = new MemoryStream())
            {
                using (var image = new MagickImage("xc:purple", settings))
                {
                    image.Format = MagickFormat.Png;
                    image.Write(memStream);
                }
            }

            using (var image = new MagickImage("./" + path + ".png"))
            {
                image.Format = MagickFormat.Jpeg;
                byte[] data = image.ToByteArray();
                System.IO.File.WriteAllBytes("./" + path + ".jpg", data);
            }
        }

        private static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [HttpPost(Name = "UploadImage")]
        public async Task<IActionResult> PostAsync(IFormFile test)
        {
            string path = RandomString(10);
            byte[] bytes;
            using (var ms = new MemoryStream())
            {
                await test.CopyToAsync(ms);
                bytes = ms.ToArray();
                System.IO.File.WriteAllBytes("./" + path + ".png", bytes);
            }
            temp(path);
            return Ok(path);
        }

        [HttpGet(Name = "GetImage")]
        public IActionResult Get(string Id)
        {
            Byte[] b = System.IO.File.ReadAllBytes(@"./" + Id + ".jpg");
            return File(b, "image/jpeg");
        }
    }
}