from flask_wtf import FlaskForm
from wtforms import FileField, TextAreaField
from wtforms.validators import InputRequired

class UploadForm(FlaskForm):
   description = TextAreaField('Description', validators=[InputRequired()])
   photo = FileField('File', validators=[InputRequired()])
