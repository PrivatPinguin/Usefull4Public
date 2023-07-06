                       #
#       Privat Pinguin  #
#       2023-04-12      #
#                       #

red=`tput setaf 1`
green=`tput setaf 2`
yellow=`tput setaf 3`
reset=`tput sgr0`

# Pfad zur Eingabedatei
input_file="tokenv6.txt"

# Überprüfen, ob die Eingabedatei vorhanden ist
if [ ! -f "$input_file" ]; then
  echo "Fehler: Die Eingabedatei existiert nicht!"
  exit 1
fi

# Namen, für die die Werte gelesen werden sollen
name1="zone"
name2="token"

# Variablen für die Werte
varZone=""
varToken=""

# Lesen der Werte aus der Eingabedatei und Zuweisung zu den Variablen
while read -r line; do
  # Extrahieren des Namens und des Werts aus der Zeile
  name="$(echo "$line" | cut -d '\' -f 1)"
  value="$(echo "$line" | cut -d '\' -f 2)"

  # Überprüfen, ob der Name übereinstimmt und entsprechend verarbeiten
  if [ "$name" = "$name1" ]; then
    varZone="$value"
  elif [ "$name" = "$name2" ]; then
    varToken="$value"
  fi
done < "$input_file"


#currentIP=`curl -6 icanhazip.com`
currentIP=`ip r get to 2001:4860:4860::8888 | perl -ne '/src ([\w:]+)/ && print "$1\n"'`
oldIP=`cat iphistory.txt`
dtm=`date +"%Y-%m-%d %H:%M:%S UTC"`
script_name=$(basename "$0")

echo "\n${yellow}INITIATING${reset}     Begin of ${script_name}\n\n"
echo "		${yellow}Old IP${reset}         :       "${green}$oldIP${reset}
echo "		${yellow}Current IP${reset}     :       "${green}$currentIP${reset}"\n"

if [ $oldIP != $currentIP ] || [ "$1" = "f" ] || [ "$1" = "F" ];
then
        echo "Updateing... \n	Zone: ${red}${varZone}${reset}\n"
        echo "$currentIP" > 'iphistory.txt'
        echo "\n	${yellow}UPDATEv4${reset}       :       try update ${yellow}IPv4${reset}:"
        curl "https://ipv4.dynv6.com/api/update?ipv4=auto&token=${varToken}&zone=${varZone}&token=${varToken}"
        echo "\n\n	${yellow}UPDATEv6${reset}       :       try update ${yellow}IPv6${reset}:"
        curl "https://ipv6.dynv6.com/api/update?ipv6=auto&token=${varToken}&zone=${varZone}&token=${varToken}"
# IPv6to4
#       curl 'https://ipv6.dynv6.com/api/update?ipv6=6to4&token=' + $token + '&zone=' + $zone + '&token=' + $token

#       echo "\n\n${yellow}INFO${reset} :       ${red}end of cURL${reset}\n"
        echo "INFO      :       $currentIP      UPDATE  $dtm    *" >> iphistory.log
        echo "\n\n	${yellow}UPDATE${reset} :       ${red}Log was updated${reset}   NEW IP :: ${green}$currentIP${reset}\n"
else
        echo "INFO      :       $oldIP  REMAIN  $dtm" >> iphistory.log
        echo "\n	${yellow}INFO${reset} :: ${green}IP remains${reset}\n"
fi

echo "${yellow}EXIT${reset}	End of Update.\n\n"
