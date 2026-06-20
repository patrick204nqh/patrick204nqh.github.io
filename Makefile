SOURCE = docs

.PHONY: serve build clean

serve:
	cd $(SOURCE) && bundle exec jekyll serve

build:
	cd $(SOURCE) && bundle exec jekyll build

clean:
	rm -rf $(SOURCE)/_site
