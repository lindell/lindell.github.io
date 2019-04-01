const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const path = require('path');
const resume = require('../resume/resume.json');
const resumeGenerator = require('jsonresume-theme-paper-plus-plus');

async function upload() {
    const s3 = new S3({
        apiVersion: '2006-03-01',
        region: 'eu-west-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    console.log("Generating resume");
    const html = resumeGenerator.render(resume);
    const base64data = Buffer.from(html);

    console.log("Uploading resume");
    await s3.putObject({
        Bucket: 'lindell-resume',
        Key: 'index.html',
        Body: base64data,
        ACL: 'public-read',
        ContentType: 'text/html;charset=utf-8',
    }).promise();

    console.log("Uploading static files");
    await uploadDir(s3, path.join(__dirname, '../static'), 'static');
}

async function uploadDir(s3, dirPath, s3Path) {
    const files = fs.readdirSync(dirPath);

    for (const fileName of files) {
        const totalPath = path.join(dirPath, fileName);
        if (fs.lstatSync(totalPath).isDirectory()) {
            continue;
        }

        const data = fs.readFileSync(totalPath);
        const base64data = Buffer.from(data);

        await s3.putObject({
            Bucket: 'lindell-resume',
            Key: path.join(s3Path, fileName),
            Body: base64data,
            ACL: 'public-read',
        }).promise();
    }
}


upload().catch(err => {
    console.log(err);
    process.exit(1);
});
