import { Dispatch, SetStateAction } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, message } from 'antd';
import _get from 'lodash/get';

export default function PictureUploader({
    handleSubmitImages,
    setRecipeState,
}: {
    handleSubmitImages: (images: any) => void;
    setRecipeState: Dispatch<
        SetStateAction<{
            isQueryLoading: boolean;
            isPicUploading: boolean;
        }>
    >;
}) {
    const APIKEY = process.env.NEXT_PUBLIC_APIKEY;
    const APIURL = process.env.NEXT_PUBLIC_APIURL;
    const CDNBASE = process.env.NEXT_PUBLIC_CDNBASE;
    const uploadProps = {
        name: 'file',
        action: `${APIURL}?key=${APIKEY}`,
        data: (file) => ({ fileUpload: file }),
        onChange: async (info) => {
            if (info.file.status === 'uploading') {
                setRecipeState((state) => ({ ...state, isPicUploading: true }));
            }
            if (info.file.status === 'done') {
                const { size, type, filename } = info.file.response;
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
                    setRecipeState((state) => ({ ...state, isPicUploading: false }));
                };
                img.src = info.file.response.url;
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                setRecipeState((state) => ({ ...state, isPicUploading: false }));
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <Upload {...uploadProps}>
            <Button>
                <UploadOutlined /> Click to Upload
            </Button>
        </Upload>
    );
}
