find . -name ".env" -not -path "*/node_modules/*" | while read envfile; do
  examplefile="${envfile}.example"
  cp "$envfile" "$examplefile"
  sed -i -E 's/=.*/=your_value_here/' "$examplefile"        # Linux
done