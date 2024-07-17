# Variables
JEKYLL = bundle exec jekyll
SOURCE = docs
CONFIG = $(SOURCE)/_config.yml,$(SOURCE)/_config.dev.yml

# Targets
.PHONY: serve build clean

serve:
	$(JEKYLL) serve --config $(CONFIG) --source $(SOURCE)

build:
	$(JEKYLL) build --config $(CONFIG) --source $(SOURCE)

clean:
	rm -rf $(SOURCE)/_site