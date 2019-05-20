
import * as rabbit from '../utils/rabbit';
import { UploadManager } from './upload.manager';
import { log } from '../utils/logger';

type videoRemovedMessage = {
    contentPath: string,
    previewPath: string,
    thumbnailPath: string,
    userId: string
};

export class UploadSubscribeBroker {
    public static async subscribe() {
        rabbit.subscribe(
            'application',
            'topic',
            'upload-action-queue',
            'videoService.video.remove.succeeded',
            UploadSubscribeBroker.deleteFiles,
        );

        rabbit.subscribe(
            'application',
            'topic',
            'upload-action-queue',
            'videoService.video.replaced.succeeded',
            UploadSubscribeBroker.deleteFiles,
        );
    }

    private static async deleteFiles(message: videoRemovedMessage) {
        const filesToRemove: string[] = [];

        if (message && message.userId) {
            if (message.contentPath) filesToRemove.push(message.contentPath);
            if (message.previewPath) filesToRemove.push(message.previewPath);
            if (message.thumbnailPath) filesToRemove.push(message.thumbnailPath);

            if (filesToRemove.length > 0) {

                filesToRemove.forEach(async (fileKey: string) => {
                    try {
                        await UploadManager.removeFile(fileKey);
                        log('info', 'File Removed Successfully', `${fileKey} was successfully removed by the user ${message.userId}`, '', message.userId);

                    } catch (error) {
                        log('error', 'File Remove Failed', `An error occured while trying to remove ${fileKey}, by the user ${message.userId}`, '', message.userId, error);
                    }
                });
            }
        }
    }
}
