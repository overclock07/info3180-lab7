from flask_wtf import FlaskForm
from wtforms import img, TextAreaField
from wtforms.validators import InputRequired

class UploadForm(FlaskForm):
   description = TextAreaField('Description', validators=[InputRequired()])
   photo = img('File', validators=[InputRequired()])
