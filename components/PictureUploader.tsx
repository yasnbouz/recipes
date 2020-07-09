import _get from 'lodash/get';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function PictureUploader({ handleSubmitImages }: { handleSubmitImages: (images: any) => void }) {
    const APIKEY = process.env.NEXT_PUBLIC_APIKEY;
    const APIURL = process.env.NEXT_PUBLIC_APIURL;
    const CDNBASE = process.env.NEXT_PUBLIC_CDNBASE;
    const uploadProps = {
        name: 'file',
        action: `${APIURL}?key=${APIKEY}`,
        data: (file) => ({ fileUpload: file }),
        onChange: async (info) => {
            if (info.file.status === 'done') {
                const { size, type, filename } = info.file.response;
                console.log(size, type, filename);
                const img = new Image();

                img.onload = function () {
                    const height = _get(this, 'naturalHeight');
                    const width = _get(this, 'naturalWidth');
                    handleSubmitImages({
                        create: [
                            {
                                handle: _get(info, 'file.response.url').replace(CDNBASE, ''),
                                fileName: filename,
                                height,
                                width,
                                size,
                                mimeType: type,
                            },
                        ],
                    });
                };
                img.src = info.file.response.url;
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    console.log(APIKEY, APIURL, CDNBASE);
    return (
        <Upload {...uploadProps}>
            <Button>
                <UploadOutlined /> Click to Upload
            </Button>
        </Upload>
    );
}
