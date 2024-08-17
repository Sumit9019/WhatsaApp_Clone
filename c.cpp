#include<bits/stdc++.h>
using namespace std;

// char getMax(string s)
// {
// int arr[26]={0};
// for(int i=0;i<s.length();i++)
// {
//     int number=0;
//     char ch=s[i];
//     if(ch>='a' && ch<='z')
//     {
// number=ch-'a';
//     }
//     else{
//         number=ch-'A';
//     }
//     arr[number]++;
    
// }
// int maxi=-1,ans=0;
// for(int i=0;i<26;i++)
// {
//     if(maxi<arr[i])
//     {
//         ans=i;
        
//         maxi=arr[i];
        
//     }

// }
// char finalAns='a'+ans;
// return finalAns;
string replace(string s)
{
for(int i=0;i<s.length();i++)
{
    string temp="";
    if(s[i]==' ')
    {
       temp.push_back("@");
       temp.push_back("4");
       temp.push_back("0");
    }
    else{
        temp.push_back(s[i]);
    }
 
}
return temp;
}



int main()
{

    cout<<"Enter string"<<endl;
   string s;
    cin>>s;
    cout<<replace(s);
    // cout<<getMax(s)<<endl;

}