import boto3

from server.library.data_store.data_store import DataStore


class S3DataStore(DataStore):
  def __init__(self, access_key, secret_key, bucket_name):
    self._bucket_name = bucket_name
    self._client = boto3.client('s3', aws_access_key_id=access_key,
      aws_secret_access_key=secret_key)

  def store_file(self, file, share_id):
    self._client.upload_fileobj(file, self._bucket_name, share_id)

  def load_file(self, share_id):
    return self._client.get_object(Bucket=self._bucket_name, Key=share_id)['Body']

  def remove_file(self, share_id):
    pass
